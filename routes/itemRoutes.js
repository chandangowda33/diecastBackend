const express = require("express");
const itemController = require("./../controller/itemController");

const router = express.Router();

router.route("/uploadItem").post(itemController.uploadItem);

module.exports = router;
