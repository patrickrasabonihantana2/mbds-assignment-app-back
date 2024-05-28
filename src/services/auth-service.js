const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Env = require('../util/env');
const UserLogin = require('../models/user-login-schema');
const User = require('../models/user-schema');

const saltRounds = 10;

class AuthService {
  async login(userLoginData) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let userLogin = await UserLogin.findOne({username: userLoginData.username});
      console.log(userLogin);

      let match = await bcrypt.compare(userLoginData.password, userLogin.password);
      console.log(match);

      if(!userLogin || !match) {
        throw new Error('User not found');
      }

      let user = await User.findById(userLogin.user);
      console.log(user);

      let tokenData = {
        user: {
          _id: user._id,
          role: user.role
        }
      };
      let token = jwt.sign(tokenData, Env.SECURITY_JWT_SECRET);

      let result = {
        token,
        user
      }
      return result;
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }

  async subscribe(userData, userLoginData) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let user = new User(userData);
      await user.save();

      userLoginData.user = user;
      userLoginData.password = await bcrypt.hash(userLoginData.password, saltRounds);
      let userLogin = new UserLogin(userLoginData);
      await userLogin.save();

      let data = {user};

      return data;
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }
}

module.exports = AuthService;
