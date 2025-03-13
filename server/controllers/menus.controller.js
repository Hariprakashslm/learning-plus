const { menuModel } = require("../schemas");
const computeMockUsersData = require("../utils/menus.utils");

module.exports = {
  getMenus: async (req, res) => {
    const menus = await menuModel.find({}).lean().exec();
    // const convertedMenuData = convertMenuData(menus);
    res.status(200).json(menus);
  },
  createMenus: async (req, res) => {
    await menuModel.insertMany(req.body);
    res.status(200).send();
  },
  update: async (req, res) => {
    await menuModel.updateOne({ _id: req.body._id }, { $set: req.body }).exec();

    res.status(200);
  },
};
