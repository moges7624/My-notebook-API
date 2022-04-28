const express = require('express')
const { Router } = require('express')
const jwt = require('jsonwebtoken')
const bookController = require('./../controllers/bookControllers')

const router = Router()

// @desc return all books
// @route GET api/books
router.get('/', bookController.books_get)

// @desc return single book
// @route GET api/books/:id
router.get('/:id', bookController.books_getById)

// @desc return book by type
// @route GET api/books/:type
router.get('/type/:type', bookController.books_getByType)

// @desc add a book
// @route POST api/books
router.post('/', bookController.books_post)

// @desc update a book
// @route PUT api/books/:id
router.put('/:id', bookController.books_update)

// @desc delete a book
// @Route DELETE api/books/:id
router.delete('/:id', bookController.books_delete)

// handle request to invalid url
router.use((req, res) => {
  res.status(404).send('Page not found')
})
module.exports = router
