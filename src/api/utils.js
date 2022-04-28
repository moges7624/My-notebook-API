const jwt = require('jsonwebtoken')

// Create token 
const createToken = (id) => {
  return jwt.sign({id} , process.env.TOKEN_SECRET, {
    expiresIn: '3d'
  })
}

// Handle auth errors
const handleErrors = (err) => {

  // let errors = { first_name: '', last_name: '', email: '', password: '' }
  let errors = {}

  // validation errors
  if (err.message.includes('validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }

  // duplicate email error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors
  }

  return errors;
}

module.exports = {
  createToken,
  handleErrors
}