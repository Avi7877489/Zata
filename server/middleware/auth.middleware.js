// middleware/auth.middleware.js
import { verifyToken } from '../utils/jwt.js';
import User from '../model/user.js';
import File from '../model/File.js';

// Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Middleware to check if the requested file belongs to the authenticated user
export const isFileOwner = async (req, res, next) => {
  try {
    const fileKey = req.params.key || req.query.key;

    
    if (!fileKey) {
      return res.status(400).json({ error: 'File key is required' });
    }
    
    const file = await File.findOne({ where: { s3Key: fileKey } });
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    if (file.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied: You do not own this file' });
    }
    
    req.file = file;
    next();
  } catch (error) {
    console.error('File access error:', error);
    return res.status(500).json({ error: 'Failed to check file ownership' });
  }
};