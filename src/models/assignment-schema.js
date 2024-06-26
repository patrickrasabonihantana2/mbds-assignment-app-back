const mongoose = require('mongoose');
const { Schema, Types } = mongoose;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const AssignmentSchema = new Schema({
  name: {type: String, required: true},
  submited: {type: Boolean, required: true},
  submission_date: {type: Date, required: false},
  score: {type: Number, min: 0, max: 20},
  comments: {type: String, required: false},

  subject: {type: Types.ObjectId, ref: 'Subject'},
  author: {type: Types.ObjectId, ref: 'User'},
});

AssignmentSchema.index({subject: 1, author: 1});
// AssignmentSchema.index({name: 1, author: 1}, {unique: true});

AssignmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Assignment", AssignmentSchema);
