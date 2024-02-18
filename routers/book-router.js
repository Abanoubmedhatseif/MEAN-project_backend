const router = require("express").Router();
const bookController = require("../controllers/book-controller");

router.get("/", async (req, res, next) => {
  await bookController
    .getAllBooks()
    .then((books) => res.status(200).json(books))
    .catch((err) => next(err));
});

router.get("/:id", async (req, res, next) => {
  await bookController
    .getOneBook(req.params.id)
    .then((book) =>
      book.length >= 1
        ? res.status(200).json(book)
        : res.status(404).send({ Message: "No data" }),
    )
    .catch((err) => next(err));
});

router.post("/", async (req, res, next) => {
  await bookController
    .createBook(req.body)
    .then((createdBook) =>
      createdBook
        ? res.status(200).json({ Message: "Done", Data: createdBook })
        : res.status(404).send({ Message: "Error just occured" }),
    )
    .catch((err) => next(err));
});

router.put("/:id", async (req, res, next) => {
  await bookController
    .updateBook({ id: req.params.id, data: req.body })
    .then((book) =>
      book
        ? res.status(200).json({ Message: "Done", Data: book })
        : res.status(404).send({ Message: "No data" }),
    )
    .catch((err) => next(err));
});

router.delete("/:id", async (req, res, next) => {
  await bookController
    .deleteBook(req.params.id)
    .then((deleted) =>
      deleted
        ? res.status(200).json({ Message: "Done | Deleted", Data: deleted })
        : res.status(404).send({ Message: "No data" }),
    )
    .catch((err) => next(err));
});

router.put("/rate/:id", async (req, res, next) => {
  await bookController
    .updateBookRates({ id: req.params.id, data: req.body })
    .then((book) =>
      book
        ? res.status(200).json({ Message: "Done", Data: book })
        : res.status(404).send({ Message: "No data" }),
    )
    .catch((err) => next(err));
});

module.exports = router;
