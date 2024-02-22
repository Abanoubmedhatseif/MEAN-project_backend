const Category = require("../Models/category");

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        userMessage: "Sorry !!, A category with this ID was not found",
      });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      res
        .status(404)
        .json({ error: "Sorry !!, A category with this ID was not found" });
    }
    res
      .status(200)
      .json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const newCategoryName = req.body.categoryName;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName: newCategoryName },
      { new: true }, // Return the updated document
    );
    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// const updateCategoryById = async (req, res) => {
//   try {
//     const categoryId = req.params.id;
//     const { categoryName } = req.body;

//     if (!categoryName) {
//       return res.status(404).json({ error: 'Invalid category name' });
//     }

//     const updatedCategory =  await Category.findOneAndUpdate(
//       { categoryId: categoryId },
//       { categoryName: categoryName },
//       { new: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     res.status(200).json({ message: 'Category updated successfully', updatedCategory });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
