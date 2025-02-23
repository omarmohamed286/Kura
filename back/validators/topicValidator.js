const { check } = require("express-validator");
const validatorMW = require("../middlewares/validatorMW");

exports.addTopicValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  validatorMW,
];

exports.deleteTopicValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id should be valid mongo id"),
  validatorMW,
];
