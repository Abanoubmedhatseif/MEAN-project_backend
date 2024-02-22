const router = require("express").Router();
const { AdminController } = require("../controllers");

router.post("/", AdminController.createAdminAccount);
router.post("/login", AdminController.loginAdmin);

router
  .route("/:id")
  .patch(AdminController.updateCredentials)
  .delete(AdminController.deleteAdmin);

module.exports = router;
