var express = require('express');
var router = express.Router();

const UserService = require('../../services/auth-service');

router.post('/login', async function(req, res) {
  let headers = req.headers;
  try {
    let userService = new UserService();
    let userLoginData = {
      username: headers.username,
      password: headers.password};
    let data = await userService.login(userLoginData);
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
