import mongoose from "mongoose";

const monasterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    country: String,
    state: String,
    city: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  established: {
    type: Date
  },
  sect: {
    type: String,  // e.g., "Tibetan", "Zen", "Theravada", etc.
  },
  description: {
    type: String
  },
  website: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  images: [String], // URLs of images
}, {
  timestamps: true
});

const Monastery = mongoose.model('Monastery', monasterySchema);

export default Monastery
