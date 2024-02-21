const router = require('express').Router();
const { AdminController } = require('../controllers');

router.post("/", AdminController.createAdminAccount);
router.post("/login", AdminController.loginAdmin);


module.exports = router;
