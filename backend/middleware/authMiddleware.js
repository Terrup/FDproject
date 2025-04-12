import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Merchant from '../models/merchantModel.js';  // Import the Merchant model
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization');
    
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    
    // Attach user or merchant to the request object based on the decoded ID
    if (req.originalUrl.includes('merchants')) {
      // If it's a merchant route, look for merchant using the token's decoded id
      req.user = await Merchant.findById(decoded.id);
    } else {
      // If it's a regular user route, look for user using the token's decoded id
      req.user = await User.findById(decoded.id).select('-password');
    }

    // Check if user or merchant exists in DB
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Token is valid, proceed to next middleware
    next();
  } catch (error) {
    // Handle token expiration or invalid token errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token has expired' });
    }

    // Other errors
    res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
  }
};

export default authMiddleware;
