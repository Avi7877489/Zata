// config/passport.config.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

// Local Strategy (Username/Password)
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email, provider: 'local' } });
      
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ 
        where: { 
          provider: 'google',
          providerId: profile.id
        } 
      });
      
      if (!user) {
        // Create new user if doesn't exist
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: 'google',
          providerId: profile.id,
          avatar: profile.photos?.[0]?.value
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Get primary email from GitHub
      const email = profile.emails?.[0]?.value;
      
      if (!email) {
        return done(new Error('No email found in GitHub profile'));
      }
      
      // Check if user already exists
      let user = await User.findOne({ 
        where: { 
          provider: 'github',
          providerId: profile.id
        } 
      });
      
      if (!user) {
        // Create new user if doesn't exist
        user = await User.create({
          name: profile.displayName || profile.username,
          email,
          provider: 'github',
          providerId: profile.id,
          avatar: profile.photos?.[0]?.value
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;