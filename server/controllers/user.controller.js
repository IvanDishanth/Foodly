import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Restaurant from "../models/restaurant.model.js";

// @desc   Get user profile
// @route  GET /api/user
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    // req.user should be set by the authenticate middleware
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



// @desc    Update user profile
// @route   PUT /api/user
// @access  Private


export const updateUserProfile = async (req, res) => {
  try {
    // 1. Find the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Validate email format if email is being updated
    if (req.body.email && !/^\S+@\S+\.\S+$/.test(req.body.email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    

    // 3. Handle profile picture upload
    if (req.file) {
      // File uploaded via multipart/form-data
      user.profilePic = req.file.buffer.toString('base64');
    } else if (req.body.profilePic && typeof req.body.profilePic === 'string') {
      // URL string from cloud upload
      user.profilePic = req.body.profilePic;
    }

    // 4. List of fields allowed to be updated
    // 4. Update user fields (excluding role)
const updatableFields = ['name', 'email', 'phone', 'profilePic'];
updatableFields.forEach(field => {
  if (req.body[field] !== undefined) {
    user[field] = req.body[field];
  }
});


    // 5. Update only those fields
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== null) {
        user[field] = req.body[field].trim ? req.body[field].trim() : req.body[field];
      }
    });

    // 6. Save updated user
    const updatedUser = await user.save();

    // 7. Build response (don’t expose sensitive fields)
    const userResponse = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profilePic: updatedUser.profilePic,
      role: updatedUser.role,
      updatedAt: updatedUser.updatedAt,
    };

    res.status(200).json(userResponse);

  } catch (err) {
    console.error('Update error:', err);

    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      console.error("Mongoose validation failed:", err.errors);
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    // Duplicate email (unique index)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Fallback: Server error
    res.status(500).json({ 
      message: 'Server error',
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
};



// @desc    Delete user account
// @route   DELETE /api/user/delete
// @access  Private
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Logout user
// @route   POST /api/logout
// @access  Private
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all restaurants (for users)
// @route   GET /api/user/restaurants
// @access  Public or Private (add protect if needed)
export const getAllRestaurantsForUser = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


