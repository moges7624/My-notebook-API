const express = require('express')
const api = require('./src/api')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const connectDB = require('./config/db')


const app = express()

// Load config
dotenv.config({ path: './config/config.env' })

// middlewares
app.use(cors())
app.use(express.json())

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}


// Listen for request
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`))

// connect to database
connectDB()


// Listen for api route 
app.use('/api', api)