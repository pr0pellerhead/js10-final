const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: ['Full name is a required field']
  },
  email: {
    type: String,
    required: ['Email is a required field']
  },
  password: {
    type: String,
    required: ['Password is a required field']
  }
});

module.exports = mongoose.model('User', userSchema);
