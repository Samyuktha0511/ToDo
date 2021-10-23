const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    isValid: {type: Boolean, default: false},
    token: { type: String },
  },
  {
      collection: 'users'
  });

module.exports = mongoose.model('User', userSchema);