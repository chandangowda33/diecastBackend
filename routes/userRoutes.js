const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/loginUser").get(userController.loginUser);
//works only in testing in PROD need to buy domain so disabled
// router.route("/verifyEmail/:token").get(userController.verifyEmail);

module.exports = router;
