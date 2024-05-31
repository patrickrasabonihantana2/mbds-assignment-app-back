var express = require('express');
var router = express.Router();

const PopulateRoute = require('./populate');

router.use(PopulateRoute);

module.exports = router;
