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
    phone: String
    website: String
    employer: String
    linkedin: String
    github: String
    bio: String
    posts: [Post]!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    post(postID: ID!): Post!
    comment(commentId: ID!): Comment!
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth

    addPost(postText: String!): Post!
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
