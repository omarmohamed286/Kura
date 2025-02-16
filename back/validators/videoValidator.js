const { check } = require("express-validator");
const validatorMW = require("../middlewares/validatorMW");

exports.addVideoValidator = [
  check("url")
    .notEmpty()
    .withMessage("url is required")
    .matches(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    )
    .withMessage("url should be valid youtube url"),
  validatorMW,
];

exports.deleteVideoValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id should be valid mongo id"),
  validatorMW,
];
