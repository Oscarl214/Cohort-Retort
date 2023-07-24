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

  console.log("userDatafrom post", post);
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
          commentText,
        },
      });
      setCommentText("");
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
    <div className="flex mx-auto items-center justify-center  mt-2 mb-8">
      {Auth.loggedIn() ? (
        <>
          <form
            className="w-full max-w-xl items-stretch  rounded-lg pt-2 "
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-full bg-white mt-2 rounded-lg border-2 p-3 border-indigo-100">
              <textarea
                name="commentText"
                placeholder="Share your Comment here..." required
                value={commentText}
                className="w-full placeholder-gray-300 focus:outline-none focus:bg-white "
                style={{ lineHeight: "1.6", resize: "vertical"}}
                onChange={handleTextareaChange}
              ></textarea>
              </div>
            </div>

            <div className="-pr-4 flex justify-end pb-4">
              <button className=" btn background-darkBlue rounded-lg btn-primary text-white p-3 btn-block py-2 hover:text-black hover:background-yellow" type="submit">
                Add Comment
              </button>
            </div>
            {error && (
              <div className="">
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
