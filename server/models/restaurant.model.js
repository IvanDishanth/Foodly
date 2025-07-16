import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  cuisine: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isOpen: { type: Boolean, default: false },
  location: {
  
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
});



export default mongoose.model("Restaurant", restaurantSchema);