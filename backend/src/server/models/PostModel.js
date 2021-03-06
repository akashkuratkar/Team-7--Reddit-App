const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    community_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    text:{
      type: String
    },
    images: {
      type: Array,
    },
    upvote: {
      type: Array,
    },
    downvote: {
      type: Array,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    post_body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
