const menusController = require("../controllers/menus.controller");

const userRoutes = [
  {
    path: "/",
    method: "get",
    middlewares: [
      (req, res, next) => {
        console.log("first middleware");
        next();
      },
      (req, res, next) => {
        console.log("secound middleware");
        next();
      },
    ],
    handler: menusController.getMenus,
  },
  {
    path: "/",
    method: "post",
    handler: menusController.createMenus,
  },
  {
    path: "/",
    method: "put",
    handler: menusController.update,
  },
];

module.exports = userRoutes;
