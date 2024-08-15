const express = require("express");
const itemController = require("./../controller/itemController");
const authMiddleware = require("./../controller/authController");

const router = express.Router();

router
  .route("/uploadItem")
  .post(authMiddleware.protect, itemController.uploadItem);

module.exports = router;
