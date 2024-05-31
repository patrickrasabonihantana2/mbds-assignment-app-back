const mongoose = require('mongoose');
const Env = require('../util/env');
const Subject = require('../models/subject-schema');

class SubjectService {
  async list() {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let data = await Subject
          .find()
          .populate('teacher', 'firstname lastname email');
      return data;
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }

  async findById(id) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let subject = await Subject
          .findById(id)
          .populate('teacher', 'firstname lastname email');

      if(subject == undefined || subject == null) {
        throw new Error('Subject not found');
      }

      return subject;
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }

  async delete(id) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let assignment = await Subject.findByIdAndDelete(id);

      return assignment;
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
