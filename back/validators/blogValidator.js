const { check } = require("express-validator");
const validatorMW = require("../middlewares/validatorMW");

exports.addBlogValidator = [
  check("url")
    .notEmpty()
    .withMessage("url is required")
    .isURL()
    .withMessage("URL Should Be Valid"),
  validatorMW,
];

exports.deleteBlogValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id should be valid mongo id"),
  validatorMW,
];

exports.getBlogInfoByUrlValidator = [
  check("url")
    .notEmpty()
    .withMessage("url is required")
    .isURL()
    .withMessage("URL Should Be Valid"),
  validatorMW,
];
