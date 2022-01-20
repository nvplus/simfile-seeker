const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user_class: {
    type: String,
    trim: true,
    default: "user"
  },
  avatar_url: {
    type: String,
    trim: true,
    default: ""
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;