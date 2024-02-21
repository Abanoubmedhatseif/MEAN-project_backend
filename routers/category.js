const router = require("express").Router();
const { CategoryController } = require("../controllers");

router
  .route("/")
  .post(CategoryController.createCategory)
  .get(CategoryController.getAllCategories);

router
  .route("/:id")
  .get(CategoryController.getCategoryById)
  .patch(CategoryController.updateCategoryById)
  .delete(CategoryController.deleteCategoryById);

module.exports = router;
