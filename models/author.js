const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  books: [{
    type: Number,
    ref: 'Books',
  }],
});

authorsSchema.pre('findOneAndUpdate', function foau(next) {
  this.options.runValidators = true;
  next();
});

const Authors = mongoose.model('Authors', authorsSchema);

module.exports = {
  Authors,
};
