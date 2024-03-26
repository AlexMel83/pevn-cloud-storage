const userController = require("../controllers/user-controller");
const { body, param, validationResult } = require("express-validator");
const ApiError = require("./../exceptions/api-errors");

const passMin = 4, phoneLength = 12;

const validateUser = [
  body("email").notEmpty().isEmail().isAscii().withMessage('Поле "email" обов"язкове до заповнення'),
  body("password").notEmpty().isLength({ min: passMin, max: 32 }).withMessage(`Поле "password" має бути не менше ${passMin} символів`),
  body("name").optional().isString().withMessage('Поле "name" має бути рядком'),
  body("surname").optional().isString().withMessage('Поле "surname" має бути рядком'),
  body("phone").optional().isLength({ min: phoneLength, max: phoneLength }).withMessage(`Поле "phone" має бути ${phoneLength} цифр`),
  body("role").optional().isString().withMessage('Поле "role" має бути рядком'),
  body("avatar").optional().isString().withMessage('Поле "avatar" має бути шляхом до файлу'),
  body("diskspace").optional().isNumeric().withMessage('Поле "amount" має бути числом'), 
];

module.exports = function (app) {
    app.post(
      "/registration",
      validateUser,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .send(ApiError.BadRequest("Помилка при валідації", errors.array()));
        }
        next();
      },
      userController.registration,
    );

    app.post(
      "/login", 
      validateUser,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .send(ApiError.BadRequest("Помилка при валідації", errors.array()));
        }
        next();
      },
      userController.login
    );

  app.get("/activate/:link", 
    param('link').isLength({ min: 5 }).withMessage('Activation link must not be empty.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    userController.activate
  );

    app.post("/logout", userController.logout);

  };
  