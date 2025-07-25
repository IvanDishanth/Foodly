import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Restaurant from "../models/restaurant.model.js";
import Food from "../models/foodModel.js";
import Table from "../models/Table.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { deleteTable, getTables } from './tableController.js';

// @desc   Get user profile
// @route  GET /api/user
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // comes from `authenticate` middleware
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// @desc    Update user profile
// @route   PUT /api/user
// @access  Private


export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    let profilePicUrl;

    if (req.file) {
      // Upload buffer to Cloudinary
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'user_profiles' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      profilePicUrl = result.secure_url;
    }

    // Now update user with new info + profilePicUrl if uploaded

    // Example:
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    if (profilePicUrl) user.profilePic = profilePicUrl;

    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// @desc    Get all food items (for users)
// @route   GET /api/user/foods
// @access  Public
export const getAllFoodsForUser = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getRestaurantDetailsForUser = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const foods = await Food.find({ restaurant: req.params.id });
    const tables = await Table.find({ restaurant: req.params.id });

    res.status(200).json({ ...restaurant.toObject(), foods, tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTablesForUser = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};