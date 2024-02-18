const router = require("express").Router();
const authorController = require("../controllers/author-controller");

router.get("/", async (req, res, next) => {
  await authorController
    .getAllAuthors()
    .then((authors) => res.status(200).json(authors))
    .catch((err) => next(err));
});

router.post("/", async (req, res, next) => {
  await authorController
    .createAuthor(req.body)
    .then(() => res.status(200).json({ Message: "Done", Data: req.body }))
    .catch((err) => next(err));
});

module.exports = router;
