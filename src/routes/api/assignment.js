var express = require('express');
var router = express.Router();

const AssignmentService = require('../../services/assignment-service');

router.get('/', async function(req, res) {
  let body = req.body;
  try {
    let assignmentService = new AssignmentService();
    let data = await assignmentService.list();
    res.jsend.success(data);
  } catch(err) {
    // console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

router.get('/:id', async function(req, res) {
  try {
    let id = req.params.id;
    let assignmentService = new AssignmentService();

    let data = await assignmentService.findById(id);
    res.jsend.success(data);
  } catch(err) {
    // console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
