const router = require('express').Router();
const { AuthorController } = require('../controllers');
const { authorInformationConfirmation, validationresult } = require('../middleware/author-validation');

router
  .get('/', AuthorController.getAuthors)
  .post('/', authorInformationConfirmation, validationresult, AuthorController.postAuthors);

router
  .get('/:authorid', AuthorController.getAuthor)
  .patch('/:authorid', authorInformationConfirmation, validationresult, AuthorController.updateAuthor)
  .delete('/:authorid', AuthorController.deleteAuthor);

router
  .get('/:authorid/authorbooks', AuthorController.getAuthorBooks);
module.exports = router;
