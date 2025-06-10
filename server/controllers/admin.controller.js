import User from "../models/user.model.js";
import Restaurant from "../models/restaurant.model.js";

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user by ID
// @route   PUT /api/admin/users/:id
// @access  Admin
export const updateUserById = async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent updating email to one that already exists
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (role) user.role = role;

    await user.save();
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: "User updated successfully", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};










// @desc    Create a new restaurant
// @route   POST /api/admin/restaurants
// @access  Admin
export const createRestaurant = async (req, res) => {
  try {
    const { name, email, address, phone, cuisine, role } = req.body;

    // Check if restaurant with this email already exists
    const exists = await Restaurant.findOne({ email });
    if (exists) return res.status(400).json({ message: "Restaurant already exists" });

    const restaurant = new Restaurant({
      name,
      email,
      address,
      phone,
      cuisine,
      role
    });

    await restaurant.save();
    res.status(201).json({ message: "Restaurant created successfully", restaurant });
  } catch (error) {
    console.error(error); // <-- Add this line
    res.status(500).json({ message: "Server error" });
  }
};



// @desc    Get all restaurants
// @route   GET /api/admin/restaurants
// @access  Admin
export const getAllRestaurants = async (req, res) => {
  console.log("getAllRestaurants called"); // Add this line
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get restaurant by ID
// @route   GET /api/admin/restaurants/:id
// @access  Admin
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update restaurant by ID
// @route   PUT /api/admin/restaurants/:id
// @access  Admin
export const updateRestaurantById = async (req, res) => {
  try {
    const { name, address, phone, cuisine } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    if (name) restaurant.name = name;
    if (address) restaurant.address = address;
    if (phone) restaurant.phone = phone;
    if (cuisine) restaurant.cuisine = cuisine;

    await restaurant.save();
    res.status(200).json({ message: "Restaurant updated successfully", restaurant });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete restaurant by ID
// @route   DELETE /api/admin/restaurants/:id
// @access  Admin
export const deleteRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    await restaurant.deleteOne();
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};