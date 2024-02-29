const router = require('express').Router();
const { AdminController } = require('../controllers');
const { adminInformationConfirmation, adminUpdatingConfirmation, validationresult } = require('../middleware/admin-validation');

router.post('/', adminInformationConfirmation, validationresult, AdminController.createAdminAccount);
router.post('/login', adminInformationConfirmation, validationresult, AdminController.loginAdmin);

router
  .route('/:id')
  .patch(adminUpdatingConfirmation, validationresult, AdminController.updateCredentials)
  .delete(AdminController.deleteAdmin);

module.exports = router;
