const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const bookController = require('../controllers/book');
const Book = require('../models/Book');

// router.get("/books/images/:bookPhotoName", (req, res) => {
//   const imagePath = 'images/' + req.params.bookPhotoName;
//   const readStream = fs.createReadStream(imagePath);
//   res.setHeader('Content-Type', 'image/jpg');   // optional but nice to have
//   readStream.pipe(res);
// })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// router.get("/upload", (req, res) => {
//   res.render("form");
// })

// // image is same as input name in the view file
// router.post("/upload", upload.single("image"), (req, res) => {
//   res.json("image uploaded");
// })

router.get('/', async (req, res, next) => {
  await bookController
    .getAllBooks(req.query.name)
    .then((books) => (books.length >= 1
      ? res.status(200).json(books)
      : res.status(404).send({ Message: 'No data' })))
    .catch((err) => next(err));
});

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('categoryId')
      .populate('authorId');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const {
      bookName, photo, categoryId, authorId,
    } = book;
    const { categoryName } = categoryId;
    const authorName = `${authorId.firstName} ${authorId.lastName}`;

    res.status(200).json({
      book: {
        bookName,
        photo,
        categoryName,
        authorName,
      },
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: error.message,
    });
  }
});

router.post('/', upload.single('bookImageFile'), async (req, res, next) => {
  console.log(req.body);
  await bookController
    .createBook(req.body)
    .then((createdBook) => (createdBook
      ? res.status(200).json({ Message: 'Done', Data: createdBook })
      : res.status(404).send({ Message: 'Error just occured' }))).catch((err) => next(err));
});

router.put('/:id', async (req, res, next) => {
  await bookController
    .updateBook({ id: req.params.id, data: req.body })
    .then((book) => (book
      ? res.status(200).json({ Message: 'Done', Data: book })
      : res.status(404).send({ Message: 'No data' })))
    .catch((err) => next(err));
});

router.delete('/:id', async (req, res, next) => {
  await bookController
    .deleteBook(req.params.id)
    .then((deleted) => (deleted
      ? res.status(200).json({ Message: 'Done | Deleted', Data: deleted })
      : res.status(404).send({ Message: 'No data' })))
    .catch((err) => next(err));
});

router.put('/rate/:id', async (req, res, next) => {
  await bookController
    .updateBookRates({ id: req.params.id, data: req.body })
    .then((book) => (book
      ? res.status(200).json({ Message: 'Done', Data: book })
      : res.status(404).send({ Message: 'No data' })))
    .catch((err) => next(err));
});

router.get('/avgrate/:id', async (req, res, next) => {
  await bookController
    .getAverageRating(req.params.id)
    .then((rating) => (rating
      ? res.status(200).json({ Message: 'Done', Avg: rating })
      : res.status(404).json({ Message: 'No rate' })));
});

module.exports = router;
