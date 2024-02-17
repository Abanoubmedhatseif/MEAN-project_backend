const router = require('express').Router();

router.use('/author', require('./author'));
router.use('/user', require('./user'));

module.exports = router;
