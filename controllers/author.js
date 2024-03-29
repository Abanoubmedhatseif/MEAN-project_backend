const { Authors } = require('../models/author');
const Book = require('../models/Book');

const getAuthors = async (req, res) => {
  try {
    let allAuthors;
    if (req.query.name) {
      allAuthors = await Authors.find({ firstName: { $regex: req.query.name, $options: 'i' } });
    } else {
      allAuthors = await Authors.find();
    }
    res.json(allAuthors);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

const getAuthor = async (req, res) => {
  try {
    const Author = await Authors.findById({ _id: req.params.authorid });
    res.json(Author);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

const postAuthors = async (req, res) => {
  try {
    const postedAuthor = await Authors.create(req.body);
    res.status(201).json({
      successMessage: 'the author added successfully',
      postedAuthor,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const newAuthor = await Authors.findOneAndUpdate(
      { _id: req.params.authorid },
      req.body,
      { returnDocument: 'after' },
    );
    res.status(200).json({
      successMessage: 'the author updated successfully',
      newAuthor,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const delAuthor = await Authors.findOneAndDelete({
      _id: req.params.authorid,
    });
    res.status(200).json({
      successMessage: 'the author deleted successfully',
      delAuthor,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

const getAuthorBooks = async (req, res) => {
  try {
    const Books = await Book.find({ authorId: req.params.authorid });
    res.status(200).json(Books);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  postAuthors,
  updateAuthor,
  deleteAuthor,
  getAuthorBooks,
};
