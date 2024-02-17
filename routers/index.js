const router = require('express').Router();

router.use('/author', require('./author'));

module.exports = router;
