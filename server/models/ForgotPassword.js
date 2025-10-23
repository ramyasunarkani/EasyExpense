const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const forgotPasswordSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // UUID as primary key
  active: { type: Boolean, default: true },
  expiresBy: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);
