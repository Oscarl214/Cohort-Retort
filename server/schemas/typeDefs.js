const { gql } = require("apollo-server-express");

//TODO: need to update addUser, updateUser mutations

const typeDefs = gql`
  type Comment {
    _id: ID!
    commentText: String!
    createdAt: String!
  }
  type Post {
    _id: ID!
    postText: String!
    createdAt: String!
    comments: [Comment]!
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    website: String
    linkedin: String
    github: String
    posts: [Post]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    posts: [Post]
    post(postID: ID!): Post
    comment(commentId: ID!): Comment
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      website: String
      linkedin: String
      github: String
    ): User
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      website: String
      linkedin: String
      github: String
    ): User
    login(email: String!, password: String!): Auth

    addPost(postText: String!): Post!
    addComment(postId: ID!, commentText: String!): Comment
    removePost(postId: ID!): String
    removeComment(commentId: ID!): String
  }
`;

module.exports = typeDefs;
