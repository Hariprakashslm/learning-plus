const { menuModel } = require('../schemas');
const { transformToMenuStructure } = require('../utils/menus.utils');

module.exports = {
  getMenus: async (req, res) => {
    const menus = await menuModel.find({}).lean().exec();
    res.status(200).json(transformToMenuStructure(menus));
  },
  createMenus: async (req, res) => {
    await menuModel.insertMany(req.body);
    res.status(200).send();
  },
  update: async (req, res) => {
    await menuModel.updateOne({ _id: req.body._id }, { $set: req.body }).exec();
    res.status(200).send();
  },
  delete: async (req, res) => {
    await menuModel.deleteOne({ _id: req.params.id }).exec();

    res.status(200).send();
  },
};
