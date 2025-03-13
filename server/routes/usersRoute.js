const usersController = require("../controllers/users.controller");

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
    handler: usersController.getUsers,
  },
];

module.exports = userRoutes;
