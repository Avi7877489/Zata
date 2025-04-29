// routes/auth.routes.js
import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import { generateToken } from '../utils/jwt.js';

const authRoutes = express.Router();

// Register a new user
authRoutes.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: 'local'
    });
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return user data and token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login with email and password
authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Login failed', details: err.message });
    }
    
    if (!user) {
      return res.status(401).json({ error: info.message || 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return user data and token
    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider
      },
      token
    });
  })(req, res, next);
});

// Google OAuth routes
authRoutes.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRoutes.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      return res.redirect(`/auth/error?message=${encodeURIComponent(err.message)}`);
    }
    
    if (!user) {
      return res.redirect(`/auth/error?message=${encodeURIComponent(info?.message || 'Authentication failed')}`);
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Redirect to frontend with token
    return res.redirect(`/auth/success?token=${token}`);
  })(req, res, next);
});

// GitHub OAuth routes
authRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRoutes.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user, info) => {
    if (err) {
      return res.redirect(`/auth/error?message=${encodeURIComponent(err.message)}`);
    }
    
    if (!user) {
      return res.redirect(`/auth/error?message=${encodeURIComponent(info?.message || 'Authentication failed')}`);
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Redirect to frontend with token
    return res.redirect(`/auth/success?token=${token}`);
  })(req, res, next);
});

// Auth success and error pages (for OAuth redirects)
authRoutes.get('/success', (req, res) => {
  res.send(`
    <html>
      <head><title>Authentication Successful</title></head>
      <body>
        <h1>Authentication Successful</h1>
        <p>You can close this window and return to the application.</p>
        <script>
          // Store token in localStorage and notify opener window
          const token = new URLSearchParams(window.location.search).get('token');
          if (token && window.opener) {
            window.opener.postMessage({ type: 'AUTH_SUCCESS', token }, '*');
            window.close();
          }
        </script>
      </body>
    </html>
  `);
});

authRoutes.get('/error', (req, res) => {
  const message = req.query.message || 'Authentication failed';
  res.send(`
    <html>
      <head><title>Authentication Error</title></head>
      <body>
        <h1>Authentication Error</h1>
        <p>${message}</p>
        <p>Please try again.</p>
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'AUTH_ERROR', message: '${message}' }, '*');
            setTimeout(() => window.close(), 5000);
          }
        </script>
      </body>
    </html>
  `);
});

export default authRoutes;