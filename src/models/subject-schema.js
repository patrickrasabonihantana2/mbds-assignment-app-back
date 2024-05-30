const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const SubjectSchema = new Schema({
  name: {type: String, required: true},

  teacher: {type: Types.ObjectId, ref: 'User'},
});

SubjectSchema.index({subject: 1, teacher: 1});

module.exports = mongoose.model("Subject", SubjectSchema);
