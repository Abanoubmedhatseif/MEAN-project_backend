const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        autoIncrement = require('mongoose-auto-increment')

const BookSchema = new Schema({

    photo: String,

    bookName: {
        type: String,
        required: true
    },

    categoryId: {
        type: Number,
        required: true,
        ref: 'Category'
      },

    authorId:  {
        type: Number,
        required: true,
        ref: 'Author'
      },

    // rating: [
    //   {
    //     userId: {      // this is id of the user who rated this book () 
    //         type: Number,
    //         // required: true,
    //         // ref: 'Category'
    //       },

    //       rate: {
    //         type: Number,
    //         // required: true,
    //         minLength: 1,
    //         maxLength: 5,
    //         default: 0
    //       }
    //    }
    // ]

})


autoIncrement.initialize(mongoose.connection);

BookSchema.plugin(autoIncrement.plugin, {
    model: 'Book',
    field: '_id',
    startAt: 1,
    incrementBy:1
})


const Book = mongoose.model("BookModel", BookSchema, "books")

module.exports = Book;