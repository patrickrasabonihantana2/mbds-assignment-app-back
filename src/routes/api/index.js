var express = require('express');
var router = express.Router();

// const UserRouter = require('./user');
const SubjectRouter = require('./subject');
// const AssignmentRouter = require('./assignment');

// router.use('user', UserRouter);
router.use('/subject', SubjectRouter);
// router.use('assignment', AssignmentRouter);

module.exports = router;
