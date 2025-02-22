const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Blog URL is required"],
    },
    title: String,
    description: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
