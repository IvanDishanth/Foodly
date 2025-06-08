import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  cuisine: String,
  // Add other fields as needed
});

export default mongoose.model("Restaurant", restaurantSchema);