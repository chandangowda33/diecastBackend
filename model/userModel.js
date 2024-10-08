const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

  role: {
    type: String,
    enum: ["admin", "user", "seller"],
    default: "user",
  },

  sellerMemberhipStarts: Date,
  sellerMemberhipEnds: Date,
  isMembershipActive: { type: Boolean, default: false },

  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  passwordChangedAt: Date, // Add this field to track password changes
});

// To hash password before change
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// to set passwordChangedAT field
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure the token is created after this change
  next();
});

// to verify password
userSchema.methods.correctPassword = async function (
  loginPassword,
  dbPassword
) {
  return await bcrypt.compare(loginPassword, dbPassword);
};

// to check whether password changed after JWT issues
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10 //.getTime( )gives time in milisecond so/1000 to make it seconds and converted to base 10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
