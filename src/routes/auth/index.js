var express = require('express');
var router = express.Router();

const loginRoute = require('./login');
const subscribeRoute = require('./subscribe');

router.use(loginRoute);
router.use(subscribeRoute);

module.exports = router;
