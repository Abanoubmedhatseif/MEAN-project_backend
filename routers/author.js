const router = require("express").Router();
const { AuthorController } = require("../controllers");

router
  .get("/", AuthorController.getAuthors)
  .post("/", AuthorController.postAuthors);

router
  .get("/:authorid", AuthorController.getAuthor)
  .patch("/:authorid", AuthorController.updateAuthor)
  .delete("/:authorid", AuthorController.deleteAuthor);

module.exports = router;
