const mongoose = require('mongoose');
const Env = require('../util/env');
const User = require('../models/user-schema');

class UserService {
  async findById(id) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let user = await User.findById(id);

      if(user == undefined || user == null) {
        throw new Error('user not found');
      }

      return user;
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }
}

module.exports = SubjectService;
