var express = require('express');
var router = express.Router();

const DemoService = require('../../services/demo-service');

router.post('/populate', async function(req, res) {
  try {
    let demoService = new DemoService();
    await demoService.populateUsers();
    await demoService.populateSubjects();
    res.jsend.success([]);
  } catch(err) {
    // console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
