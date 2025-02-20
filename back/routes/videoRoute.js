const express = require("express");
const {
  addVideo,
  deleteVideo,
  getVideos,
  getVideoInfoByUrl,
} = require("../services/videoService.js");
const {
  addVideoValidator,
  deleteVideoValidator,
  getVideoInfoByUrlValidator,
} = require("../validators/videoValidator.js");

const router = express.Router();

router.route("/info").post(getVideoInfoByUrlValidator, getVideoInfoByUrl);
router.route("/").get(getVideos).post(addVideoValidator, addVideo);
router.route("/:id").delete(deleteVideoValidator, deleteVideo);

module.exports = router;
