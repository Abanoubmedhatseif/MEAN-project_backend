const router = require('express').Router();
const { CategoryController } = require('../controllers');
const { categoryNamingConfirmation, validationresult } = require('../middleware/category-validation');

router
  .route('/')
  .post(categoryNamingConfirmation, validationresult, CategoryController.createCategory)
  .get(CategoryController.getAllCategories);

router
  .route('/:id')
  // .get(CategoryController.getCategoryById)
  .patch(categoryNamingConfirmation, validationresult, CategoryController.updateCategoryById)
  .delete(CategoryController.deleteCategoryById);

module.exports = router;
