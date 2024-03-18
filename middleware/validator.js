const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
exports.userValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be 6 to 20 characters long!"),
];



exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];
exports.todoInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("name is missing!"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("description is a required field!"),
  check("priority")
    .trim()
    .not()
    .isEmpty()
    .withMessage("priority is a required field!"),
   check("targetdate")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Date is a required field!"),
];
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }

  next();
};