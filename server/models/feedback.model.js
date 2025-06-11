import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, {
  timestamps: true,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;