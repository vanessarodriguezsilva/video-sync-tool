const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Roles posibles: admin, supervisor, editor, productor, lector
  role: {
    type: String,
    enum: ['admin', 'supervisor', 'editor', 'productor', 'lector'],
    default: 'lector',
  },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
