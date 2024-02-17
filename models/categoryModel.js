const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, unique: true },
    categoryName: { type: String, required: true, unique: true, minlength: 3, maxlength: 12},
  }
);

const findHighestCategoryId = async () => {
  const highestCategory = await categoryModel.findOne({}, {}, { sort: { 'categoryId': -1 } });
  return highestCategory ? highestCategory.categoryId : 0;
};

async function incrementId (next){
  const doc = this;
  if (doc.isNew) {
    try {
      const highestCategoryId = await findHighestCategoryId();
      doc.categoryId = highestCategoryId + 1;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
};


categorySchema.pre('save',incrementId);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
