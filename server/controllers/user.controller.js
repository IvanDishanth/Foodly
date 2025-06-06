import User from "../models/user.model.js";

// @desc    Get current user profile
// @route   GET /api/user
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const { _id, name, email, phone, role } = req.user;
    res.status(200).json({ id: _id, name, email, phone, role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/user
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(422).json({ message: "Missing fields" });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
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
    // If using cookies for JWT, clear it here
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};