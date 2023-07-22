import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../utils/mutations"; //Bringing in the add post mutation
import { QUERY_POSTS, QUERY_USER } from "../utils/queries"; //Bringing in my post queries and my user query
import Auth from "../utils/auth"; //bringing in my Auth middleware
import PostHeader from "./PostComponents/PostHeader";

const CreatePost = () => {
  const [postText, setPostText] = useState(""); //state use of post Text that will be provided
  const [showInputBox, setShowInputBox] = useState(false);

  // const { data } = useQuery(QUERY_USER); //using the user query

  // const { user } = data || { user: { posts: [] } };

  const { loading, data: userData } = useQuery(QUERY_USER);

  console.log(userData);

  // const [addPost, { error }] = useMutation(ADD_POST, {
  //   //function created to execute ADD_POST mutation
  //   update(cache, { data: { addPost } }) {
  //     //update the Apollo cache after successful mutation
  //     try {
  //       const { posts } = cache.readQuery({ query: QUERY_POSTS }) || {
  //         posts: [],
  //       };
  //       //reads the existing posts from the query that gets all posts

  //       cache.writeQuery({
  //         //updates the post query with the new post
  //         query: QUERY_POSTS,
  //         data: { posts: [addPost, ...posts] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     const { user } = cache.readQuery({ query: QUERY_USER });
  //     //updates the user query that gets all the information and adds the post to their profile
  //     cache.writeQuery({
  //       query: QUERY_USER,
  //       data: { user: { ...user, posts: [...user.posts, addPost] } },
  //     });
  //   },
  // });

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await addPost({
  //       //executes once postText has been provided
  //       variables: {
  //         //if successful the data variable will contain the return information
  //         postText,
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      if (userData && userData.user) {
        try {
          const { posts } = cache.readQuery({ query: QUERY_POSTS }) || {
            posts: [],
          };

          cache.writeQuery({
            query: QUERY_POSTS,
            data: { posts: [addPost, ...posts] },
          });


          cache.writeQuery({
            query: QUERY_USER,
            data: {
              user: {
                ...userData.user,
                posts: [...userData.user.posts, addPost],
              },
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
      const { data } = await addPost({
        variables: {
          postText,
        },
      });

      const postId = data.addPost._id;
      
      setPostText("");
      setShowInputBox(false);

    } catch (err) {
      console.error(err);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      {Auth.loggedIn() ? (
        <>
          {showInputBox ? (
            <form onSubmit={handleFormSubmit} className="w-full">
              <textarea
                name="postText"
                placeholder="Share your Post here..."
                value={postText}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={(event) => setPostText(event.target.value)}
              ></textarea>

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
            <div className="mt-3 bg-danger text-white p-3">
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