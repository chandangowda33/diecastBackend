const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userAddress: String,
  userPincode: String,
  userRole: String,
  UserImage: String,
});

const User = mongoose.model("User", userSchema);

module.exports = Event;
