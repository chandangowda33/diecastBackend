const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  modelBrand: String,
  vehicleBrand: String,
  itemScale: String,
  itemPrice: String,
  discountedPrice: String,
  quantity: String,
  discountedPrice: String,
  itemImgURLS: [itemImgURLS],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
