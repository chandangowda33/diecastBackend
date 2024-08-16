const Item = require("./../model/itemModel");

exports.uploadItem = async (req, res, next) => {
  const item = new Item(req.body);
  item.dateCreated = Date.now();
  item.seller = req.user._id;
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

exports.getItemList = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ dateCreated: -1 }).exec();

    return res.status(200).json({
      status: "Success",
      items,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: "Something went wrong, please try again",
    });
  }
};
