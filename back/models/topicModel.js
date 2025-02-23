const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Topic title is required"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Topic", topicSchema);
