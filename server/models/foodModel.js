import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: 'https://placehold.co/150x100/888888/FFFFFF?text=New+Food'
  }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;