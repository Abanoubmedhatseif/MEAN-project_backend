const { Authors } = require('../models/author');

const getAuthors = async (req, res) => {
  try {
    const allAuthors = await Authors.find();
    res.json(allAuthors);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAuthor = async (req, res) => {
  try {
    const Author = await Authors.find({ _id: req.params.authorid });
    res.json(Author);
  } catch (err) {
    res.status(400).json(err);
  }
};

const postAuthors = async (req, res) => {
  try {
    const postedAuthor = await Authors.create(req.body);
    res.json(postedAuthor);
  } catch (err) {
    res.status(400).json({ m1: req.body, m2: err });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const newAuthor = await Authors.findOneAndUpdate({ _id: req.params.authorid }, req.body, { returnDocument: 'after' });
    res.json(newAuthor);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const delAuthor = await Authors.findOneAndDelete({ _id: req.params.authorid });
    res.json(delAuthor);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  postAuthors,
  updateAuthor,
  deleteAuthor,
};
