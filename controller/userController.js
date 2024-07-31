const User = require("./../model/userModel");

exports.registerEvent = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).json({
      status: "Success",
      message: "You are successfully registered",
      user: req.body,
    });
  } catch (error) {
    res
      .status(400)
      .json({
        status: "Failed",
        message: "Something went wrong",
      })
      .then(() => console.log(error));
  }
};
