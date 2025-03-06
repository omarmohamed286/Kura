const asyncHandler = require("express-async-handler");

const videoModel = require("../models/videoModel");
const getVideoInfo = require("./youtubeVideoInfoService");

exports.getVideoInfoByUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const { title, thumbnail, channelName } = await getVideoInfo(url);
  res.status(201).json({ title, thumbnail, channelName });
});

exports.addVideo = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const isVideoExist = await videoModel.findOne({ url });
  if (isVideoExist) {
    return res.status(400).json({ message: "Video already exists" });
  }
  const { title, thumbnail, channelName } = await getVideoInfo(url);
  const video = new videoModel({ url, title, thumbnail, channelName });
  await video.save();
  res.status(201).json({ data: video });
});

exports.deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findByIdAndDelete(id);
  if (!video) {
    return res
      .status(404)
      .json({ message: `There is no video with this id: ${id}` });
  }
  res.status(204).json({});
});

exports.getVideos = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  let query = {};
  if (keyword) {
    query = { title: { $regex: keyword.trim(), $options: "i" } };
  }
  const videos = await videoModel.find(query);
  res.status(200).json({ data: videos });
});
