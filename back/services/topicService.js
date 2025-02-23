const asyncHandler = require("express-async-handler");

const topicModel = require("../models/topicModel");

exports.addTopic = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const isTopicExist = await topicModel.findOne({ title });
  if (isTopicExist) {
    return res.status(400).json({ message: "Topic already exists" });
  }
  const topic = new topicModel({ title });
  await topic.save();
  res.status(201).json({ data: topic });
});

exports.deleteTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const topic = await topicModel.findByIdAndDelete(id);
  if (!topic) {
    return res
      .status(404)
      .json({ message: `There is no topic with this id: ${id}` });
  }
  res.status(204).json({});
});

exports.getTopics = asyncHandler(async (req, res) => {
  const documentsCount = await topicModel.countDocuments();
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const lastIndex = page * limit;
  const pagination = {};
  pagination.currentPage = page;
  pagination.limit = limit;
  pagination.totalPages = Math.ceil(documentsCount / limit);

  if (lastIndex < documentsCount) {
    pagination.next = page + 1;
  }
  if (skip > 0) {
    pagination.prev = page - 1;
  }
  const { keyword } = req.query;
  let query = {};
  if (keyword) {
    query = { title: { $regex: keyword.trim(), $options: "i" } };
  }

  const topics = await topicModel.find(query).skip(skip).limit(limit);

  res.status(200).json({ data: topics, pagination });
});
