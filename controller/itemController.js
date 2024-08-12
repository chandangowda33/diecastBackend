const Item = require("./../model/itemModel");

exports.uploadItem = async (res, req, next) => {
  console.log(req.body);
  const item = new Item(req.body);
  try {
    await item.save();

    res.status(200).json({
      status: "Success",
      message: "Item Registered successfully",
      item,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Something went wrong.",
      err,
    });
  }
};
