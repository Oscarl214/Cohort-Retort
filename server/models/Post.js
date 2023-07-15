const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    comments: [Comment.schema],
    createdat: {
      type: Date,
      default: Date.now,
      get: (date) => date.toISOString().split("T")[0],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a post, we'll get commentCount to let us know how many total comments belong to a post
postsSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
