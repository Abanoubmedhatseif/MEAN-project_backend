const router = require('express').Router();
const { AuthorController } = require('../controllers');
const { authorInformationConfirmation, validationresult } = require('../middleware/author-validation');

router.get('/', AuthorController.getAuthors);

router.get('/:authorid', AuthorController.getAuthor);

router.post('/', authorInformationConfirmation, validationresult, AuthorController.postAuthors);

router.patch('/:authorid', authorInformationConfirmation, validationresult, AuthorController.updateAuthor);

router.delete('/:authorid', AuthorController.deleteAuthor);

module.exports = router;
