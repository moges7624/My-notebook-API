const UserModel = require('./../models/UserModel')
const { createToken, handleErrors } = require('./../utils')

// 

// @desc handle signup
module.exports.signup = async (req, res) => {
  // get data from the request
  const { first_name, last_name, email, password } = req.body

  try {
    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      password
    })
    const token = createToken(user._id)
    res.status(201)
    res.json({
      status: "success",
      data: {
        token: token,
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
      },
      errors: null
    })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({
      status: "error",
      data: null,
      errors: errors
    })
  }
}

// @desc handle login
module.exports.login = async (req, res) => {

  // get data from the request
  const { email, password } = req.body
  console.log(req.body);

  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      if (password !== user.password) {
        throw Error('incorrect password')
      } else {
        const token = createToken(user._id)

        res.status(200).json({
          status: "success",
          data: {
            token: token,
            user: {
              id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email
            }
          },
          errors: null
        })

      }
    } else {
      throw Error('incorrect email')
    }

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "error",
      data: null,
      errors: error.message
    })
  }
}
