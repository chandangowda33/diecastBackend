const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  modelBrand: String,
  vehicleBrand: String,
  itemScale: String,
  itemPrice: Number,
  discountedPrice: Number,
  quantity: Number,
  itemImgURLS: [String],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
