const userController = require("../controllers/user-controller");
const { body, param } = require("express-validator");

module.exports = function (app) {
    app.post(
      "/registration",
      body("email").isEmail().isAscii(),
      body("password").isLength({ min: 4, max: 32 }),
      body("phone").isLength(12),
      userController.registration,
    );
  };
  