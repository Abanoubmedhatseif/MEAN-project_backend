const router = require('express').Router();
const { adminInformationConfirmation, adminUpdatingConfirmation, validationresult } = require('../middleware/admin-validation');
const { AdminController } = require('../controllers');

router.post('/', adminInformationConfirmation, validationresult, AdminController.createAdminAccount);
router.post('/login', adminInformationConfirmation, validationresult, AdminController.loginAdmin);

router.route('/:id')
  .patch(adminUpdatingConfirmation, validationresult, AdminController.updateCredentials)
  .delete(AdminController.deleteAdmin);

module.exports = router;
