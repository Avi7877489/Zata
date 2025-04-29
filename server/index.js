import express from "express";
import cors from "cors";
import multer from "multer";
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { DbConnection } from "./config/db.config.js";
import passport from "./config/passport.config.js";
import { isAuthenticated, isFileOwner } from "./middleware/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import user from "./model/user.js";
import File from "./model/File.js";
import { fileURLToPath } from "url";
import session from "express-session";

// Initialize config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup (needed for Passport, even though we use JWT)
app.use(session({
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport
app.use(passport.initialize());

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// AWS S3 Client
const s3 = new S3Client({
  endpoint: process.env.ZATA_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: process.env.ZATA_ACCESS_KEY,
    secretAccessKey: process.env.ZATA_SECRET_KEY,
  },
  forcePathStyle: true,
});

// Routes
app.use('/auth', authRoutes);

// Upload Route (protected, requires authentication)
app.post("/upload", isAuthenticated, upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Create a unique file key that includes user ID to ensure uniqueness
  const fileKey = `${req.user.id}/${Date.now()}-${file.originalname}`;
  const filePath = path.resolve(file.path);
  const fileBuffer = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: process.env.ZATA_BUCKET_NAME,
    Key: fileKey,
    Body: fileBuffer,
    ContentLength: file.size,
    ContentType: file.mimetype,
  });

  try {
    // Upload to S3
    await s3.send(command);
    
    // Save file record in database
    await File.create({
      fileName: file.originalname,
      s3Key: fileKey,
      fileType: file.mimetype,
      fileSize: file.size,
      userId: req.user.id
    });
    
    // Clean up temp file
    fs.unlinkSync(filePath);
    
    console.log("✅ File uploaded to Zata S3 successfully!");
    res.json({ 
      message: "✅ File uploaded to Zata successfully!",
      key: fileKey
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

// List user's Files Route (protected)
app.get("/files", isAuthenticated, async (req, res) => {
  try {
    // Get files from the database that belong to the current user
    const files = await File.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'fileName', 's3Key', 'fileType', 'fileSize', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ files });
  } catch (err) {
    console.error("❌ Error listing files:", err);
    res.status(500).json({ error: "Failed to list files", details: err.message });
  }
});

// Get File Route (protected, checks file ownership)
app.get("/file", isAuthenticated, isFileOwner, async (req, res) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.ZATA_BUCKET_NAME,
      Key: req.file.s3Key
    });

    const response = await s3.send(command);
    
    // Set appropriate headers
    res.setHeader('Content-Type', req.file.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${req.file.fileName}"`);
    
    // Stream the file to response
    response.Body.pipe(res);
  } catch (err) {
    console.error("❌ Error retrieving file:", err);
    res.status(500).json({ error: "Failed to retrieve file", details: err.message });
  }
});

// Delete File Route (protected, checks file ownership)
app.delete("/file", isAuthenticated, isFileOwner, async (req, res) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.ZATA_BUCKET_NAME,
      Key: req.file.s3Key
    });

    await s3.send(command);
    
    // Remove file record from database
    await req.file.destroy();
    
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting file:", err);
    res.status(500).json({ error: "Failed to delete file", details: err.message });
  }
});

app.get('/file/view',async(req, res) => {
  try {
    const key = req.query.key;
    if (!key) {
      return res.status(400).json({ error: "File key is required" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.ZATA_BUCKET_NAME,
      Key: key
    });
    

    const url = await getSignedUrl(s3,command, { expiresIn: 60*60 });

    return res.status(200).json({ url: url });

  } catch (error) {
    console.error("Error generating signed URL:", error); 
    return res.status(500).json({ error: "Failed to generate signed URL" });
  }

})

// Start server
app.listen(PORT, async () => {
  // Connect to database and sync models
  await DbConnection();
  
  try {
    // Sync models with the database
    await user.sync();
    await File.sync();
    console.log("✅ Database models synced successfully!");
  } catch (error) {
    console.error("❌ Failed to sync database models:", error);
  }
  
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});