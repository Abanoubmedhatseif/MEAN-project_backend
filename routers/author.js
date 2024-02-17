const router = require('express').Router();
const { AuthorController } = require('../controllers');

router.get('/', AuthorController.getAuthors);

router.get('/:authorid', AuthorController.getAuthor);

router.post('/', AuthorController.postAuthors);

router.patch('/:authorid', AuthorController.updateAuthor);

router.delete('/:authorid', AuthorController.deleteAuthor);

module.exports = router;
