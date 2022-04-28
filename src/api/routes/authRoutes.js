const express = require('express')
const { Router } = require('express')
const authController = require('./../controllers/authControllers')

const router = Router()

// @desc add user to a database
// @route POST: /api/auth/signup
router.post('/signup', authController.signup)

// @desc login user
// @route POST: /api/auth/login
router.post('/login', authController.login)

// handle request to invalid url
router.use((req, res) => {
  res.status(404).send('Page not found')
})


module.exports = router