import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations"; //Bringing in the add comment mutation
import { QUERY_COMMENTS, QUERY_POST } from "../utils/queries"; //Bringing in my comment queries and my user query
import Auth from "../utils/auth"; //bringing in my Auth middleware

const CreateComment = ({ postID }) => {
  //state use of comment Text that will be provided
  const [commentText, setCommentText] = useState("");
  console.log("postID", postID);

  const { data } = useQuery(QUERY_POST, {
    variables: { postID },
  });

  const { post } = data || { post: { comments: [] } };

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      // Only update cache if 'addComment' data is available
      if (addComment) {
        try {
          const { comments } = cache.readQuery({
            query: QUERY_COMMENTS,
          }) || { comments: [] };
          // Read the existing comments from the query that gets all comments

          cache.writeQuery({
            query: QUERY_COMMENTS,
            data: { comments: [addComment, ...comments] },
          });

          const { post } = cache.readQuery({
            query: QUERY_POST,
            variables: { postID },
          });
          // Read the specific post query using the 'postID'

          cache.writeQuery({
            query: QUERY_POST,
            variables: { postId: postID },
            data: {
              post: { ...post, comments: [...post.comments, addComment] },
            },
          });
        } catch (e) {
          console.error(e);
        }
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addComment({
        //executes once commentText has been provided
        variables: {
          postId: postID,
          //if successful the data variable will contain the return information
          commentText,
        },
      });
      console.log("Add comment mutation result:", data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleTextareaChange = (event) => {
    // Update the commentText state when the textarea value changes
    setCommentText(event.target.value);
    // Add a console.log to see the updated commentText
    console.log("Updated Comment Text:", event.target.value);
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Share your Comment here..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleTextareaChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your comments. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};
export default CreateComment;
