const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      //dedicated for our profile page, allows us populate posts based on user that is logged in on the profile page
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "posts",
          populate: {
            path: "comments",
            model: "Comment",
          },
        });
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async (parent, args, context) => {
      //dedicated for our home page, allows us to populate all the posts+comments in the database, only if user is logged in
      if (context.user) {
        const users = await User.find().populate({
          path: "posts",
          populate: {
            path: "comments",
            model: "Comment",
          },
        });
        return users;
      }
      throw new AuthenticationError("Not logged in");
    },
    post: async (parent, { postID }, context) => {
      if (context.user) {
        const post = await Post.findById(postID).populate("comments");
        return post;
      }
      throw new AuthenticationError("Not logged in");
    },
    comment: async (parent, { commentId }, context) => {
      //query dedicated to targeting specific comments that user creates to be able to execute mutations
      if (context.user) {
        const comment = await Comment.findById(commentId);
        return comment;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      return { user };
    },
    //Works via GraphQL
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    //Works via GraphQL
    login: async (parent, { email, password }) => {
      //Works via GraphQL
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { postText }, context) => {
      //Works via GraphQL

      if (context.user) {
        //create our post
        const post = await Post.create({ postText });

        //we update our User that is logged in to add the post they just created to their account

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError("Not logged in");
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({ commentText });

        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $push: { comments: comment._id } },
          { new: true }
        ).populate("comments");

        if (!updatedPost) {
          throw new Error("Post not found");
        }

        return comment;
      }
      throw new AuthenticationError("Not logged in");
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const deletedPost = await Post.deleteOne({ _id: postId });

        if (deletedPost.deletedCount === 1) {
          //deletedCount comes from Mongo when performing delete operations

          await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { posts: postId } },
            { new: true }
          );
          return "Post deleted Successfully";
        } else {
          throw new Error("Post not found");
        }
      }
      throw new AuthenticationError("Not logged in");
    },
    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const deletedComment = await Comment.deleteOne({
          _id: commentId,
        });

        if (deletedComment.deletedCount === 1) {
          await Post.findOneAndUpdate(
            { comments: commentId },
            { $pull: { comments: commentId } },
            { new: true }
          );
          return "Comment deleted Successfully";
        } else {
          throw new Error("Comment not found");
        }
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
