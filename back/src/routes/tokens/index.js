const router = require('express').Router();

router.use('/', require('./post.token'));
router.use('/', require('./post.validateToken'));
router.use('/', require('./get.token'));

module.exports = router;
