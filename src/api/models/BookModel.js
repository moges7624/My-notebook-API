const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  author: {
    type: [{ type: String }]
  },
  type: {
    type: String,
    enum: ["fiction", "nonfiction"],
    default: "nonfiction"
  },
  genre: {
    type: String
  },
  cover_image: {
    type: String
  },
  language: {
    type: String
  },
  summary: {
    type: String
  },
  rating: {
    type: Number
  },
  have_read: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'user is required'], 
    ref: 'User'
  }
})

const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel