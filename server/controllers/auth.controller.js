import User from '../models/user.model.js';
import Restaurant from '../models/restaurant.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// User Registration
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (role === "admin") {
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can create admin users" });
      }
    }
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);
    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Restaurant Registration
export const registerRestaurant = async (req, res) => {
  const { name, email, password, address, phone, cuisine } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const restaurantExists = await Restaurant.findOne({ email });
    if (restaurantExists)
      return res.status(400).json({ message: "Restaurant already exists" });

    const hashedUserPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedUserPassword,
      role: "partner",
    });

    const hashedRestaurantPassword = await bcrypt.hash(password, 10);
    const restaurant = await Restaurant.create({
      name,
      email,
      password: hashedRestaurantPassword,
      address,
      phone,
      cuisine,
      admin: user._id,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Restaurant and user registered successfully",
      user: { id: user._id, name: user.name, role: user.role },
      restaurant,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Restaurant Login
export const loginRestaurant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(restaurant._id, "restaurant");

    res.status(200).json({
      message: "Restaurant login successful",
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};