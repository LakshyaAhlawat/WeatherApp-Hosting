const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  searches: [
    {
      city: {
        type: String,
        required: true
      },
      country: { // Add this field
        type: String,
        required: true
      },
      response: {
        type: Object,
        required: true
      },
      searchedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);