const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  number: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "TEACHER", "STUDENT"],
    default: "STUDENT",
  }
});

UserSchema.index({number: 1}, {unique: true});

module.exports = mongoose.model("User", UserSchema);
