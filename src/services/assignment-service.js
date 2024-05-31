const mongoose = require('mongoose');
const Env = require('../util/env');
const Assignment = require('../models/assignment-schema');

class AssignmentService {
  async list(page = 1, limit = 10) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      const aggregate = Assignment.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
          },
        },
        { $unwind: '$author' },
        {
          $lookup: {
            from: 'subjects',
            localField: 'subject',
            foreignField: '_id',
            as: 'subject',
          },
        },
        { $unwind: '$subject' },
        {
          $lookup: {
            from: 'users',
            localField: 'subject.teacher',
            foreignField: '_id',
            as: 'subject.teacher',
          },
        },
        { $unwind: '$subject.teacher' },
        {
          $project: {
            name: 1,
            submited: 1,
            submission_date: 1,
            score: 1,
            comments: 1,
            'author.firstname': 1,
            'author.lastname': 1,
            'author.email': 1,
            'subject.name': 1,
            'subject.teacher.firstname': 1,
            'subject.teacher.lastname': 1,
            'subject.teacher.email': 1,
          },
        },
      ]);

      // Paginate the aggregation results
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      };

      let data = await Assignment.aggregatePaginate(aggregate, options);
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
        throw new Error('Assignment not found');
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

  async delete(id) {
    try {
      await mongoose.connect(Env.MONGO_URL);

      let assignment = await Assignment.findByIdAndDelete(id);

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

module.exports = AssignmentService;
