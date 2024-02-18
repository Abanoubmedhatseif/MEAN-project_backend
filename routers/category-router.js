const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

router.get("/", async (req, res, next) => {
  await categoryController
    .getAllCategories()
    .then((categories) => res.status(200).json(categories))
    .catch((err) => next(err));
});

router.post("/", async (req, res, next) => {
  await categoryController
    .createCategory(req.body)
    .then(() => res.status(200).json({ Message: "Done", Data: req.body }))
    .catch((err) => next(err));
});

module.exports = router;
