import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // <-- Added email field
  address: String,
  phone: String,
  cuisine: String,
  role: {
    type: String,
    enum: ["partner", "franchise", "branch"], // Example roles for restaurants
    default: "partner"
  }
  // Add other fields as needed
});

export default mongoose.model("Restaurant", restaurantSchema);