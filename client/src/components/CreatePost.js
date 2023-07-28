import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations"; //Bringing in the add post mutation
import { QUERY_POSTS } from "../utils/queries"; //Bringing in my post queries and my user query
import Auth from "../utils/auth"; //bringing in my Auth middleware
import Linkify from "react-linkify";

const CreatePost = () => {
  const [postText, setPostText] = useState(""); //state use of post Text that will be provided
  const [showInputBox, setShowInputBox] = useState(false);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setShowInputBox(false);
      const { data } = await addPost({
        variables: {
          postText,
        },
      });
      setPostText("");
    } catch (err) {
      console.error("error adding post", err);
    }
  };

  const handleAddPostClick = () => {
    setShowInputBox(true);
    setPostText(""); // Clear the text box
  };

  const handleCancelClick = () => {
    setPostText(""); // Clear the text box
    setShowInputBox(false);
  };

  return (
    <div className="mx-4 md:mx-auto md:max-w-2xl my-6 pt-24 lg:pt-0 ">
      {Auth.loggedIn() ? (
        <>
          {showInputBox ? (
            <form
              onSubmit={handleFormSubmit}
              className="px-2 py-4 pt-8 rounded-xl border-t-4 border-blue-900 shadow-slate-400 bg-white"
            >
              <textarea
                name="postText"
                placeholder="Share your Post here..." required
                value={postText}
                className="w-full p-5 px-4 py-2 border border-gray-300 rounded-lg resize-none"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={(event) => setPostText(event.target.value)}
              ></textarea>
              <Linkify>
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="text-bold background-darkBlue text-white py-2 px-4 rounded-lg hover:background-yellow hover:text-black"
                  >
                    Add Post
                  </button>
                  <button
                    type="button"
                    className="text-bold px-4 py-2 background-medBlue text-white rounded-lg hover:background-yellow hover:text-black"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </Linkify>
            </form>
          ) : (
            <div className="flex justify-center">
              <button
                className="background-darkBlue text-white py-2 px-4 rounded-lg hover:background-yellow hover:text-black text-bold"
                onClick={handleAddPostClick}
              >
                Create Post
              </button>
            </div>
          )}
          {error && (
            <div className="mt-3 bg-danger text-red-800 p-3">
              {error.message}
            </div>
          )}
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CreatePost;
