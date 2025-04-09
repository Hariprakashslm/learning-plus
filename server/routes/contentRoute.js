const contentController = require('../controllers/content.controller');

const contentRoutes = [
  {
    path: '/',
    method: 'get',
    middlewares: [
      (req, res, next) => {
        next();
      },
      (req, res, next) => {
        next();
      },
    ],
    handler: contentController.getContent,
  },
  {
    path: '/',
    method: 'post',
    handler: contentController.createContent,
  },
  {
    path: '/:id',
    method: 'put',
    handler: contentController.update,
  },
  {
    path: '/:id',
    method: 'delete',
    handler: contentController.delete,
  },
];

module.exports = contentRoutes;
