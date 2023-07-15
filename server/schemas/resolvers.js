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
          populate: "posts",
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
    post: async (parent, { postId }, context) => {
      //query dedicated to targeting a specific post that user creates to be able to execute mutations
      if (context.user) {
        const userPosts = await Post.findOne({
          _id: postId,
          user: context.user._id,
        }).populate({
          populate: "comments",
        });
        return userPosts;
      }
      throw new AuthenticationError("Not logged in");
    },
    comment: async (parent, { commentId }, context) => {
      //query dedicated to targeting specific comments that user creates to be able to execute mutations
      if (context.user) {
        const comment = await Comment.findOne({
          _id: commentId,
          user: context.user._id,
        }).populate("post");
        return comment;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
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
  },

  //We need mutations for our Posts & Comments

  //Posts:
  //Create
  //Update
  //Delete
  //Comments:
  //Create
  //Update
  //Delete
};

module.exports = resolvers;
