const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String, required: true, unique: true, minlength: 3, maxlength: 12,
    },
  },
);

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
