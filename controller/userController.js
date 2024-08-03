const User = require("./../model/userModel");
const sendEmail = require("./../utils/email");

exports.registerEvent = async (req, res, next) => {
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
