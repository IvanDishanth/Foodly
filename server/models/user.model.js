import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  cuisine: String,
  role: { type: String, default: 'user' }
});

export default mongoose.model('User', userSchema);
