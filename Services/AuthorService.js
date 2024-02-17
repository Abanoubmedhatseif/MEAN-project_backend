const Author = require('../Models/Author')

const getAllAuthors = async () => {
    return await Author.find({});
}

const createAuthor = async (data) => {
    return await Author.create(data)
}


module.exports = {
    getAllAuthors,
    createAuthor,
}
