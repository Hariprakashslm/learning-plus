const menuRoute = require("./menuRoute");

const appRoutes = require("express").Router();

const globalCustomMiddleware = [
  (req, res, next) => {
    console.log("first global middleware");
    next();
  },
  (req, res, next) => {
    console.log("secound global middleware");
    next();
  },
];

const routesToResister = [
  {
    path: "/menus",
    middlewares: [
      (req, res, next) => {
        console.log("first root middleware");
        next();
      },
      (req, res, next) => {
        console.log("secound root middleware");
        next();
      },
    ],
    routes: menuRoute,
  },
];

routesToResister.forEach((rootRoute) => {
  rootRoute.routes.forEach((route) => {
    appRoutes[route.method](
      `${rootRoute.path}${route.path}`,
      ...(globalCustomMiddleware || []),
      ...(rootRoute.middlewares || []),
      ...(route.middlewares || []),
      route.handler
    );
  });
});

module.exports = appRoutes;
