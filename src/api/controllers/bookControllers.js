const BookModel = require("./../models/BookModel");
const { handleErrors } = require("./../utils");

// controller for book post route
module.exports.books_post = async (req, res) => {
  // Get values from request
  const title = req.body.title ? req.body.title : undefined;
  const author = req.body.author ? req.body.author : undefined;
  const type = req.body.type ? req.body.type : undefined;
  const genre = req.body.genre ? req.body.genre : undefined;
  const cover_image = req.body.cover_image ? req.body.cover_image : undefined;
  const language = req.body.language ? req.body.language : undefined;
  const have_read = req.body.have_read ? req.body.have_read : undefined;
  const user = req.user.id ? req.user.id : undefined;

  // save it to db
  try {
    const book = await BookModel.create({
      title,
      author,
      type,
      genre,
      cover_image,
      language,
      have_read,
      user,
    });
    res.status(201).json({
      status: "success",
      data: {
        book,
      },
      errors: null,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({
      status: "error",
      data: null,
      errors: errors,
    });
  }
};

// controller for get: books/ route
module.exports.books_get = async (req, res) => {
  console.log(req.user.id);
  let user_id = req.user.id;
  try {
    const books = await BookModel.find({
      user: user_id,
    }).lean();
    res.status(200).json({
      status: "success",
      data: {
        books,
      },
      errors: null,
    });
  } catch (err) {
    res.status(200).json({
      status: "success",
      data: null,
      errors: err,
    });
  }
};

// controller for get: books/:id route
module.exports.books_getById = async (req, res) => {
  const book_id = req.params.id;
  const user = req.user.id;
  console.log(`user: ${user} , \n book: ${book_id}`);

  try {
    const book = await BookModel.findOne({
      _id: book_id,
      user,
    });
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
      errors: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: null,
      errors: {
        message: "invalid id",
      },
    });
  }
};

// controller for get: books/:type
module.exports.books_getByType = async (req, res) => {
  // get the type of books from the query parameter
  const type = req.params.type;
  const user = req.user.id;

  try {
    if (type !== "fiction" && type !== "nonfiction") {
      throw Error("invalid type");
    } else {
      const books = await BookModel.find({
        type,
        user,
      });
      res.status(200).json({
        status: "success",
        data: {
          books,
        },
        errors: null,
      });
    }
  } catch (error) {
    let errors = error.message;
    res.status(400).json({
      status: "error",
      data: null,
      errors,
    });
  }
};

// Controller for put: books/:id
module.exports.books_update = async (req, res) => {
  // get values
  const book_id = req.params.id;
  const title = req.body.title ? req.body.title : undefined;
  const author = req.body.author ? req.body.author : undefined;
  const type = req.body.type ? req.body.type : undefined;
  const genre = req.body.genre ? req.body.genre : undefined;
  const cover_image = req.body.cover_image ? req.body.cover_image : undefined;
  const language = req.body.language ? req.body.language : undefined;
  const have_read = req.body.have_read ? req.body.have_read : undefined;
  const user = req.user.id ? req.user.id : undefined;

  try {

    const book = await BookModel.findOneAndUpdate({ _id: book_id, user: user }, {
      title, author, type, genre, cover_image, language, have_read
    }, { new: true })

    res.status(201).json({
      status: "success",
      data: {
        book
      },
      error: null,
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      data: null,
      error: error,
    });
  }
};

// Controller for delete: books/:id
module.exports.books_delete = async (req, res) => {
  // get book id from the request
  const book_id = req.params.id;
  const user = req.user.id;

  try {
    await BookModel.findOneAndRemove({
      _id: book_id,
      user: user,
    });
    res.json("deleted");
  } catch (error) {
    res.json({
      error,
    });
  }
};
