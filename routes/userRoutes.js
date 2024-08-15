const express = require("express");
const userController = require("./../controller/userController");
const authMiddleware = require("./../controller/authController");
const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/loginUser").post(userController.loginUser);
//works only in testing in PROD need to buy domain so disabled
// router.route("/verifyEmail/:token").get(userController.verifyEmail);

router.route("/protece").get(authMiddleware.protect, authMiddleware.protectYes);

module.exports = router;
