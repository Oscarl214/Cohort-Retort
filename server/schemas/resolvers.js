const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
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
    userByPost: async (parent, { postId }) => {
      try {
        // Find the post by its ID
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found");
        }

        // Retrieve the user associated with the post
        const user = await User.findById(post.user);

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    userById: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (err) {
        throw new Error(err.message);
      }
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
        const post = await Post.findById(postID)
          .populate("comments")
          .populate("user");
        return post;
      }
      throw new AuthenticationError("Not logged in");
    },
    posts: async (parent, args, context) => {
      try {
        const posts = await Post.find()
          .sort({ createdAt: -1 })
          .populate("user"); // Populate the user field
        // .populate("comments")
        return posts;
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      }
    },
    comment: async (parent, { commentId }, context) => {
      //query dedicated to targeting specific comments that user creates to be able to execute mutations
      if (context.user) {
        const comment = await Comment.findById(commentId).populate("user");
        return comment;
      }
      throw new AuthenticationError("Not logged in");
    },
    comments: async (parent, args, context) => {
      return Comment.find().sort({ createdAt: -1 });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { args, token };
    },
    //Works via GraphQL
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const loggedInUserId = context.user._id;

        // Only allow updating specific fields (e.g., username, linkedin, github, website)
        const allowedFields = {
          username: args.username,
          linkedin: args.linkedin,
          github: args.github,
          website: args.website,
        };

        // Find the user in the database and check if the user ID matches the logged-in user ID
        const updatedUser = await User.findOneAndUpdate(
          { _id: loggedInUserId },
          allowedFields,
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("User not found"); // Optional error handling if the user is not found
        }
        return updatedUser;
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
      const user = context.user;

      if (context.user) {
        //create our post
        const newPost = new Post({
          postText,
          user: context.user._id,
          username: context.user.username,
        });

        const post = await newPost.save();

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

        // Create a new comment object with the commentText and username
        const newComment = {
          commentText,
          username: context.user.username,
          createdAt: new Date().toISOString(),
          userId: context.user._id,
        };

        // Find the post by ID and update the comments array by pushing the new comment object
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $push: { comments: newComment } },
          { new: true }
        );

        if (!updatedPost) {
          throw new Error("Post not found");
        }

        return updatedPost;
      }

      throw new AuthenticationError("Not logged in");
    },

    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        const { username } = context.user;

        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }

        const alreadyLiked = post.likes.some(
          (like) => like.username === username
        );

        if (alreadyLiked) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        const updatedPost = await post.save();
        return updatedPost;
      }

      throw new AuthenticationError("Not logged in");
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        try {
          const post = await Post.findById(postId);
          if (!post) {
            throw new ApolloError("Post not found", "NOT_FOUND");
          }

          // Check if the currently logged-in user is the creator of the post
          if (post.user.toString() !== context.user._id.toString()) {
            throw new AuthenticationError("Not authorized to remove this post");
          }

          const deletedPost = await Post.deleteOne({ _id: postId });

          if (deletedPost.deletedCount === 1) {
            await User.findByIdAndUpdate(
              context.user._id,
              { $pull: { posts: postId } },
              { new: true }
            );
            return "Post deleted successfully";
          } else {
            throw new ApolloError("Post not found", "NOT_FOUND");
          }
        } catch (error) {
          throw new ApolloError("Error deleting post", "INTERNAL_SERVER_ERROR");
        }
      } else {
        throw new AuthenticationError("Not logged in");
      }
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
