import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

// Password comparison method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Pre-save middleware to hash password if modified
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const User = mongoose.model('User', userSchema);
export default User;
