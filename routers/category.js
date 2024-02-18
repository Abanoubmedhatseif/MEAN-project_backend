const router = require("express").Router();
const { CategoryController } = require('../controllers');

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.delete("/:id", CategoryController.deleteCategoryById);
router.put('/:id', CategoryController.updateCategoryById);

module.exports = router;