const asyncHandler = require("express-async-handler");

const blogModel = require("../models/blogModel");
const getBlogInfo = require("./blogInfoService");

exports.getBlogInfoByUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const { title, description } = await getBlogInfo(url);
  res.status(201).json({ title, description });
});

exports.addBlog = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const isBlogExist = await blogModel.findOne({ url });
  if (isBlogExist) {
    return res.status(400).json({ message: "Blog already exists" });
  }
  const { title, description } = await getBlogInfo(url);
  const blog = new blogModel({ url, title, description });
  await blog.save();
  res.status(201).json({ data: blog });
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findByIdAndDelete(id);
  if (!blog) {
    return res
      .status(404)
      .json({ message: `There is no blog with this id: ${id}` });
  }
  res.status(204).json({});
});

exports.getBlogs = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  let query = {};
  if (keyword) {
    query = { title: { $regex: keyword.trim(), $options: "i" } };
  }
  const blogs = await blogModel.find(query);
  res.status(200).json({ data: blogs });
});
