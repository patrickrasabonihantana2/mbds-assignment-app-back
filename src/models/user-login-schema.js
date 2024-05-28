const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const UserLoginSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},

  user: {type: Types.ObjectId, ref: 'User'}
});

UserLoginSchema.index({username: 1}, {unique: true});
UserLoginSchema.index({username: 1, password: 1}, {unique: true});

module.exports = mongoose.model("UserLogin", UserLoginSchema);
