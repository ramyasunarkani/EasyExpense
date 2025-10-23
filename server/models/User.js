const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },

  password: {
    type: String,
    required: true,
  },

  isPremium: {
    type: Boolean,
    default: false,
  },

  totalExpenses: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
