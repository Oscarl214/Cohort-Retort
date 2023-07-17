const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      //dedicated for our profile page, allows us populate posts based on user that is logged in on the profile page
      if (context.user) {
        const user = await User.findById(context.user._id).populate("posts");
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
    // addComment: async (parent, { postId, commentText }, context) => {
    //   if (context.user) {
    //     const comment = await Comment.create({ commentText });

    //     await Post.findByIdAndUpdate(
    //       postId,
    //       { $push: { comments: comment._id } },
    //       { new: true }
    //     );

    //     if (!updatedPost) {
    //       throw new Error("Post not found");
    //     }

    //     return comment;
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({ comment: commentText });

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
    removePost: async (parent, { postId }) => {
      return Post.findOneAndDelete({ _id: postId });
    },
    removeComment: async (parent, { postId, commentId }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },

  //We need mutations for our Posts & Comments

  //Posts:
  //Create *
  //Update
  //Delete *
  //Comments:
  //Create *
  //Update
  //Delete *
};

module.exports = resolvers;
