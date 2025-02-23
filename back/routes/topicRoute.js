const express = require("express");
const {
  addTopic,
  deleteTopic,
  getTopics,
} = require("../services/topicService.js");
const {
  addTopicValidator,
  deleteTopicValidator,
} = require("../validators/topicValidator.js");

const router = express.Router();

router.route("/").get(getTopics).post(addTopicValidator, addTopic);
router.route("/:id").delete(deleteTopicValidator, deleteTopic);

module.exports = router;
