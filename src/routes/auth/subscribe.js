var express = require('express');
var router = express.Router();

const UserService = require('../../services/auth-service');

router.post('/subscribe', async function(req, res) {
  let body = req.body;
  try {
    let userService = new UserService();
    let user = {
      number: body.number,
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      role: body.role
    };
    let userLogin = {
      username: body.username,
      password: body.password,
    };
    let data = await userService.subscribe(user, userLogin) ;
    res.status(201).jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
