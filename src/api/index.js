const express = require('express')
const authRouter = require('./routes/authRoutes') 
const bookRouter = require('./routes/bookRoutes')
const { verifyToken } = require('./middlewares/authMiddleware')
const cors = require('cors')

const api = express()


// api.use(cors())
api.use('/auth', authRouter)

api.use('/books', verifyToken, bookRouter)

api.use('/test', (req, res) => {
  res.json({message: "success"})
})

module.exports = api
