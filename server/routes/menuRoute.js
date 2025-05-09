const menusController = require('../controllers/menus.controller');

const userRoutes = [
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
    handler: menusController.getMenus,
  },
  {
    path: '/',
    method: 'post',
    handler: menusController.createMenus,
  },
  {
    path: '/:id',
    method: 'put',
    handler: menusController.update,
  },
  {
    path: '/:id',
    method: 'delete',
    handler: menusController.delete,
  },
];

module.exports = userRoutes;
