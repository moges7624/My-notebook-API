const mongoose = require('mongoose')
const { isEmail } = require('validator')


const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'first name cannot be empty']
  },
  last_name: {
    type: String,
    required: [true, 'last name cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'email cannot be empty'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'invalid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
})

const User = mongoose.model('user', UserSchema);

module.exports = User