const express = require("express");
const {
  addBlog,
  deleteBlog,
  getBlogs,
  getBlogInfoByUrl,
} = require("../services/blogService.js");
const {
  addBlogValidator,
  deleteBlogValidator,
  getBlogInfoByUrlValidator,
} = require("../validators/blogValidator.js");

const router = express.Router();

router.route("/info").post(getBlogInfoByUrlValidator, getBlogInfoByUrl);
router.route("/").get(getBlogs).post(addBlogValidator, addBlog);
router.route("/:id").delete(deleteBlogValidator, deleteBlog);

module.exports = router;
