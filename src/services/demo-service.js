
const mongoose = require('mongoose');
const Env = require('../util/env');

const users = require('../demo-data/assignment.users.json');
const userLogins = require('../demo-data/assignment.userlogins.json');
const subjects = require('../demo-data/assignment.subjects.json');

const User = require('../models/user-schema');
const UserLogin = require('../models/user-login-schema');
const Subject = require('../models/subject-schema');

const AuthService = require('./auth-service');

class DemoService {
  async populateUsers() {
    try {
      await mongoose.connect(Env.MONGO_URL);

      await User.deleteMany();
      await UserLogin.deleteMany();


      for(let user of users) {
        let data = {
          _id: user._id.$oid,
          number: user.number,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role
        };
        let s = new User(data);
        await s.save();
      }

      for(let userLogin of userLogins) {
        let data = {
          _id: userLogin._id.$oid,
          username: userLogin.username,
          password: userLogin.password,
          user: userLogin.user.$oid
        };
        let s = new UserLogin(data);
        await s.save();
      }

    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }

  async populateSubjects() {
    try {
      await mongoose.connect(Env.MONGO_URL);

      await Subject.deleteMany();

      for(let subject of subjects) {
        let data = {
          _id: subject._id.$oid,
          name: subject.name,
          teacher: subject.teacher.$oid
        };
        let s = new Subject(data);
        await s.save();
      }
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }
}

module.exports = DemoService;
