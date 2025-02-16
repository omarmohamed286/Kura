const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Video URL is required"],
    },
    title: String,
    thumbnail: String,
    channelName: String,
    isWatched: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Video", videoSchema);
