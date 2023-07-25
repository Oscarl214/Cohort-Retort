import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      _id
      username
      email
      linkedin
      github
      website
      posts {
        _id
        postText
        createdAt
        username
        comments {
          _id
          commentText
          createdAt
          username
          likes {
            createdAt
            username
          }
        }
      }
    }
  }
`;

export const USER_BY_POST = gql`
  query getUserByPostId($postId: ID!) {
    getUserByPostId(postId: $postId) {
      _id
      username
      email
      linkedin
      website
      github
    }
  }
`;

export const USER_BY_ID = gql`
  query UserById($userId: ID!) {
    userById(userId: $userId) {
      _id
      username
      email
      linkedin
      website
      github
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      username
      email
      website
      linkedin
      github
      posts {
        _id
        postText
        createdAt
        username
        comments {
          _id
          commentText
          createdAt
          username
          likes {
            createdAt
            username
          }
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
      username
      comments {
        _id
        commentText
        createdAt
        userId
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
      username
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postText
      createdAt
      username
      user {
        _id
        username
        email
        linkedin
        github
        website
      }
      comments {
        _id
        commentText
        createdAt
        username
        userId
        likes {
          _id
          createdAt
          username
        }
      }
      likes {
        _id
        createdAt
        username
      }
    }
  }
`;

export const POST_BY_USER = gql`
  query getPostsByUser($userId: ID!) {
    getPostsByUser(userId: $userId) {
      posts {
        _id
        postText
        createdAt
        username
        user {
          _id
          username
          email
          linkedin
          github
          website
        }
        comments {
          _id
          commentText
          createdAt
          username
          likes {
            _id
            createdAt
            username
          }
        }
        likes {
          _id
          createdAt
          username
        }
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
      username
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
