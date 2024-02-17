const router = require('express').Router();

router.use('/author', require('./author'));
router.use('/category', require('./category'))
router.use('/admin', require('./admin'))

module.exports = router;
