const router = require("express").Router();

router.use("/author", require("./author"));
router.use("/category", require("./category"));
router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/book", require("./book"));

module.exports = router;
