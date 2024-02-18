const Category = require("../models/category");

const getAllCategories = async () => Category.find({});

const createCategory = async (data) => Category.create(data);

module.exports = {
  getAllCategories,
  createCategory,
};
