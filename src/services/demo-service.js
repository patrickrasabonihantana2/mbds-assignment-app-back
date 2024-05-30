
const mongoose = require('mongoose');
const Env = require('../util/env');

const users = require('../demo-data/assignment.users.json');
const userLogins = require('../demo-data/assignment.userlogins.json');
const subjects = require('../demo-data/assignment.subjects.json');
const assignments = require('../demo-data/assignment.assignments.json');

const User = require('../models/user-schema');
const UserLogin = require('../models/user-login-schema');
const Subject = require('../models/subject-schema');
const Assignment = require('../models/assignment-schema');

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

  async populateAssignments() {
    try {
      await mongoose.connect(Env.MONGO_URL);

      await Assignment.deleteMany();

      for(let assignment of assignments) {
        let data = {
          _id: assignment._id.$oid,
          name: assignment.name,
          submited: assignment.submited,
          score: assignment.score,
          comments: assignment.comments,
          subject: assignment.subject.$oid,
          author: assignment.author.$oid
        };
        data.submission_date = (assignment.submission_date != undefined) ? assignment.submission_date.$date : null;
        let s = new Assignment(data);
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
