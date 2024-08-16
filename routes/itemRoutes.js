const express = require("express");
const itemController = require("./../controller/itemController");
const authMiddleware = require("./../controller/authController");

const router = express.Router();

router
  .route("/uploadItem")
  .post(authMiddleware.protect, itemController.uploadItem);

router.route("/newArrivals").get(itemController.getItemList);

module.exports = router;
