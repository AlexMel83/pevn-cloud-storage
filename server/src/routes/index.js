const authRouteInit = require("./auth.routes");

const routeInit = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  authRouteInit(app);
};

module.exports = {
  routeInit,
};
