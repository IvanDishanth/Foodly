import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: String,
  phone: String,
  cuisine: String,
  role: {
    type: String,
    enum: ["partner", "franchise", "branch", "restaurant"],
    default: "partner"
  },
  status: { type: String, enum: ["open", "closed"], default: "open" }, // <-- Add this
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <-- Add this
});

export default mongoose.model("Restaurant", restaurantSchema);