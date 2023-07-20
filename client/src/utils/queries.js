import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      firstName
      lastName
      email
      phone
      website
      employer
      linkedin
      github
      posts {
        _id
        postText
        createdAt
        comments {
          _id
          commentText
          createdAt
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    user {
      firstName
      lastName
      email
      phone
      website
      employer
      linkedin
      github
      posts {
        _id
        postText
        createdAt
        comments {
          _id
          commentText
          createdAt
        }
      }
    }
  }
`;

export const QUERY_POST = gql`
  query getPost($postID: ID!) {
    post(postID: $postID) {
      _id
      postText
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query getComment($commentId: ID!) {
    comment(commentId: $commentId) {
      _id
      commentText
      createdAt
    }
  }
`;

export const QUERY_POSTS = gql`
  query {
    posts {
      _id
      postText
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
