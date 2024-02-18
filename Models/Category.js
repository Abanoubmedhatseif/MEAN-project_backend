const mongoose = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const CategorySchema = new mongoose.Schema(
  { categoryName: { type: String, required: true } },
  { timestamps: true },
);

// This is important. You can remove initialization in different file
autoIncrement.initialize(mongoose.connection);

CategorySchema.plugin(autoIncrement.plugin, {
  model: "Category",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

const Category = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = Category;
