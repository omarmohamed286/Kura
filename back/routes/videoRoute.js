const express = require("express");
const {
  addVideo,
  deleteVideo,
  getVideos,
} = require("../services/videoService.js");
const {
  addVideoValidator,
  deleteVideoValidator,
} = require("../validators/videoValidator.js");

const router = express.Router();

router.route("/").get(getVideos).post(addVideoValidator, addVideo);
router.route("/:id").delete(deleteVideoValidator, deleteVideo);

module.exports = router;
