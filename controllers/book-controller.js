const Book = require('../models/book')

const getAllBooks = async () => {
    return await Book.find({});
}

const getOneBook = async (id) => {
    return await Book.find({_id: id});
}

const createBook = async (data) => {
    return await Book.create(data)
}

const updateBook = async (idAndData) => {
    const {id, data} = idAndData;
    return await Book.findOneAndUpdate({_id: id}, data, {new: true}, (error, doc) => error => error ? error : doc)
}


const updateBookRates = async (idAndData) => {
    const {id, data} = idAndData;
    return await Book.findById(id)
    .then( (book) => {
        if (!book) return null
        const targetBookRatings = book.rating;
        targetBookRatings.push(data)
        return book.save()
    })
    .catch(err => err)
}

const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id)
}


module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    updateBookRates,
    deleteBook
}
