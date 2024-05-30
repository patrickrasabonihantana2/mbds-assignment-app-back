const mongoose = require('mongoose');
const Env = require('../util/env');
const Assignment = require('../models/assignment-schema');

class AssignmentService {
  async list() {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let data = await Assignment
          .find()
          .populate('author', 'firstname lastname email')
          .populate({
            path: 'subject',
            populate: {
              path: 'teacher',
              select: 'firstname lastname email',
            },
          });
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

      let assignment = await Assignment
          .findById(id)
          .populate('author', 'firstname lastname email')
          .populate({
            path: 'subject',
            populate: {
              path: 'teacher',
              select: 'firstname lastname email',
            },
          });

      if(assignment == undefined || assignment == null) {
        throw new Error('Subject not found');
      }

      return assignment;
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }

  async get(assData) {

  }
  async save(assData) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let assignment = new Assignment(assData);
      assignment = await assignment.save();

      return [];
    } catch(err) {
      throw err;
    } finally {
      if(mongoose.connection.readyState == 'connected') {
        await mongoose.disconnect();
      }
    }
  }
  async update(assData) {

  }
}

module.exports = AssignmentService;
