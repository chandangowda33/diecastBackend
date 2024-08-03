const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, "A user must have a name"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },

  address: {
    type: String,
  },
  pincode: {
    type: String,
  },

  ////works only in testing in PROD need to buy domain so disabled
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  // verificationToken: String,
  // verificationTokenExpires: Date,
});

//works only in testing in PROD need to buy domain so disabled
// userSchema.methods.createVerificationToken = function () {
//   const verificationToken = crypto.randomBytes(32).toString("hex");

//   this.verificationToken = crypto
//     .createHash("sha256")
//     .update(verificationToken)
//     .digest("hex");
//   this.verificationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//   return verificationToken;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
