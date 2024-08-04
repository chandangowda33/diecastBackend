const User = require("./../model/userModel");
const auth = require("././authController");
const sendEmail = require("./../utils/email");

exports.loginUser = async (req, res, next) => {
  console.log(req.body);
  const { phoneNumber, password } = req.body;

  //unless we use.select password won't come
  const user = await User.findOne({ phoneNumber }).select("+password");

  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "Failed",
      message: "Incorrect email or password",
    });
  }

  const jwt = auth.createJWT(user._id);
  res.status(200).json({
    status: "Success",
    message: "Login successful",
    jwt,
    user,
  });
};

exports.registerUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();

    //works only in testing in PROD need to buy domain so disabled
    // const verificationToken = user.createVerificationToken();
    // console.log(user);

    // await user.save({ validateBeforeSave: false }); //skip the validation checks before saving the document.
    //When creating a verification token or similar temporary data that doesn't need to be validated.

    // const verificationURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/users/verifyEmail/${verificationToken}`;

    // const message = `Please verify your email by clicking on the following link: ${verificationURL}`;

    // await sendEmail({
    //   email: user.email,
    //   subject: "Email Verification",
    //   message,
    // });
    // console.log("mail sent");
    res.status(200).json({
      status: "Success",
      message: "You are successfully registered.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

//works only in testing in PROD need to buy domain so disabled
// exports.verifyEmail = async (req, res, next) => {
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     verificationToken: hashedToken,
//     verificationTokenExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).json({
//       status: "Failed",
//       message: "Token is invalid or has expired",
//     });
//   }

//   user.isVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpires = undefined;
//   await user.save();

//   res.status(200).json({
//     status: "Success",
//     message: "Email successfully verified!",
//   });
// };

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: "Failed",
      message: "Please provide email and password!",
    });
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "Failed",
      message: "Incorrect email or password",
    });
  }

  // 3) If everything is ok, send token to client
  // (You would typically generate a JWT token here)
  res.status(200).json({
    status: "Success",
    message: "Login successful",
    user,
  });
};
