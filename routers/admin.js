const router = require('express').Router();
const { AdminController } = require('../controllers');

router.post("/register", AdminController.createAdminAccount);
router.post("/login", AdminController.loginAdmin);


module.exports = router;
