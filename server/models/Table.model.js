import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: 'https://placehold.co/150x100/888888/FFFFFF?text=Table',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);

export default Table;
