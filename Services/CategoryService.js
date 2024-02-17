const Category = require('../Models/Category')

const getAllCategories = async () => {
    return await Category.find({});
}

const createCategory = async (data) => {
    return await Category.create(data)
}


module.exports = {
    getAllCategories,
    createCategory,
}
