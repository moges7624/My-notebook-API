const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

  // Get the auth header value
  const bearerHeader = req.headers['authorization']

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ')
    // Get token form the array
    const bearerToken = bearer[1]

    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, decodedData) => {
      if (err) {
        res.json({ message: 'invalid token' })
      } else {
        req.user = decodedData
        next()
      }
    })

  } else {
    // Forbidden
    res.status(403).json({ message: 'forbidden' })
  }


}

module.exports = {
  verifyToken
}