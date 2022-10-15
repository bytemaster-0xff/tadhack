const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/hello-world', require('./tts-hello-world'));
router.use('/dial-time', require('./dial-time'));
router.use('/', require('./home'));
router.use('/index', require('./home'));
router.use('/welcome', require('./welcome'));
router.use('/pageone', require('./pageone'));
router.use('/pagetwo', require('./pagetwo'));
router.use('/pagethree', require('./pagethree'));
router.use('/pagefour', require('./pagefour'));
router.use('/pagefive', require('./pagefive'));
router.use('/pagesix', require('./pagesix'));

module.exports = router;
