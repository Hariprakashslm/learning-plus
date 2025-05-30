const menuRoute = require('./menuRoute');

const appRoutes = require('express').Router();

const globalCustomMiddleware = [
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
];

const routesToResister = [
  {
    path: '/menus',
    middlewares: [
      (req, res, next) => {
        next();
      },
      (req, res, next) => {
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
