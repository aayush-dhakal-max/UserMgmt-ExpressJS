const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  bio: { type: String },
  phonenum: { type: String },
  company: { type: String },
  designation: { type: String },
});

const User = mongoose.model("users", userSchema);

module.exports = { User };
