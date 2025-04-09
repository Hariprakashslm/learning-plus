const { contentModel } = require('../schemas');

module.exports = {
  getContent: async (req, res) => {
    const contents = await contentModel.find({}).lean().exec();
    res.status(200).json(contents);
  },
  createContent: async (req, res) => {
    await contentModel.insertMany(req.body);
    res.status(200).send();
  },
  update: async (req, res) => {
    await contentModel
      .updateOne({ _id: req.body._id }, { $set: req.body })
      .exec();
    res.status(200).send();
  },
  delete: async (req, res) => {
    await contentModel.deleteOne({ _id: req.params.id }).exec();

    res.status(200).send();
  },
};
