const mongoose = require("mongoose");

const { Schema } = mongoose;

// const { commentSchema } = require("./Comment");

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
    comments: [
      {
        comment: {
          type: String,
          trim: true,
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
