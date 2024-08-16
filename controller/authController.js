const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");

exports.createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.protect = async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "Failed",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  try {
    console.log("inside try");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const currentUser = await User.findById(decoded.id);
    // console.log(currentUser);
    if (!currentUser) {
      return res.status(401).json({
        status: "Failed",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    req.user = currentUser;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "Failed",
      message: "Invalid token. Please log in again.",
      error,
    });
  }
};

exports.protectYes = async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "You have access to this route",
    user: req.user,
  });
};
