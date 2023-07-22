import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      firstName
      lastName
      email
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
    users {
      firstName
      lastName
      email
      website
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

export const QUERY_COMMENTS = gql`
  query {
    comments {
      _id
      commentText
      createdAt
    }
  }
`;

export const QUERY_COMMENTS_BY_POST = gql`
  query getComments($postID: ID!) {
    post(postID: $postID) {
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
