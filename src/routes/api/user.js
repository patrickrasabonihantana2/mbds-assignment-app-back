var express = require('express');
var router = express.Router();

const UserService = require('../../services/user-service');

router.get('/:id', async function(req, res) {
  try {
    let id = req.params.id;
    let userService = new UserService();

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
