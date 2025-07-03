import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check for token in cookies, headers, or query
    const token = req.cookies?.token || 
                 req.headers?.authorization?.replace('Bearer ', '') || 
                 req.query?.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authorization token required' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    
    const response = {
      success: false,
      message: 'Invalid or expired token'
    };

    if (err.name === 'TokenExpiredError') {
      return res.status(440).json(response);
    }
    return res.status(401).json(response);
  }
};