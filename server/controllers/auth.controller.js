import User from '../models/user.model.js';
import Restaurant from '../models/restaurant.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;  // <-- add `name` here
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const registerRestaurant = async (req, res) => {
  try {
    const { name, email, password, address, phone, cuisine } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const restaurantExists = await Restaurant.findOne({ email });
    if (restaurantExists)
      return res.status(400).json({ message: "Restaurant already exists" });

    // Hash password for User
    const hashedUserPassword = await bcrypt.hash(password, 10);

    // Create user with role partner
    const user = await User.create({
      name,
      email,
      password: hashedUserPassword,
      role: "partner",
    });

    // Hash password for Restaurant (can be the same as user password or different)
    const hashedRestaurantPassword = await bcrypt.hash(password, 10);

    // Create restaurant with hashed password
    const restaurant = await Restaurant.create({
      name,
      email,
      password: hashedRestaurantPassword,
      address,
      phone,
      cuisine,
      admin: user._id,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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


export const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;

    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: restaurant._id, role: "restaurant" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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
