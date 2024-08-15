const Item = require("./../model/itemModel");

exports.uploadItem = async (req, res, next) => {
  // console.log(req.body);
  const item = new Item(req.body);
  try {
    await item.save();

    res.status(200).json({
      status: "Success",
      message: "Item Registered successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Something went wrong.",
    });
  }
};
