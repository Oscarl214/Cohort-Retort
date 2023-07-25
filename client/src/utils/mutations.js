import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $github: String
    $website: String
    $linkedin: String
    $profilePicUrl: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      github: $github
      website: $website
      linkedin: $linkedin
      profilePicUrl: $profilePicUrl
    ) {
      token
      user {
        _id
      }
    }
  }
`;
// TODO: Double check update user mutation
export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $password: String!
    $linkedin: String
    $github: String
    $website: String
    $profilePicUrl: String
  ) {
    updateUser(
      username: $username
      email: $email
      password: $password
      linkedin: $linkedin
      github: $github
      website: $website
      profilePicUrl: $profilePicUrl
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
    }
  }
`;

// export const UPLOAD_PROFILE_PIC = gql`
//   mutation UploadProfilePic {
//     uploadProfilePic {
//       _id
//       username
//       email
//       website
//       linkedin
//       github
//       profilePicUrl
//     }
//   }
// `;
