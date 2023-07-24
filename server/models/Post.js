const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// const Comment = require("./Comment");

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => date.toISOString().split("T")[0],
  },
  username: {
    type: String,
    required: true,
  },
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toISOString().split("T")[0],
      },
    },
  ],
});

//TODO: see description naming (should it be postText?)
const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toISOString().split("T")[0],
    },
    username: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [commentSchema],

    likes: [
      {
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (date) => date.toISOString().split("T")[0],
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a post, we'll get commentCount to let us know how many total comments belong to a post
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

commentSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
