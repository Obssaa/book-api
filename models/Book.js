const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [0, 'Year must be positive'],
    max: [2025, 'Year cannot be in the future']
  }
});

module.exports = mongoose.model('Book', bookSchema);
