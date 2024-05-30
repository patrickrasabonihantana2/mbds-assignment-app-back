var express = require('express');
var router = express.Router();

const SubjectService = require('../../services/subject-service');

router.get('/', async function(req, res) {
  let body = req.body;
  try {
    let subjectService = new SubjectService();
    let data = await subjectService.list();
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
    let subjectService = new SubjectService();

    let data = await subjectService.findById(id);
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
