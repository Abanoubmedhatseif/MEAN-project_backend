const router = require('express').Router();

router.use('/authors', require('./author-router'));
router.use('/categories', require('./category-router'));
router.use('/books', require('./book-router'));

module.exports = router;
