import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePic: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin', 'partner'],
    default: 'user',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
