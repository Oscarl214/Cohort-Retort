import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import PostHeader from "./PostComponents/PostHeader";
import CreateComment from "../components/CreateComment";
import Comment from "../components/Comment";
import { UserContext } from "../utils/userContext";

const UserInfo = () => {
  // const { data, loading, error } = useQuery(QUERY_USER);
  const [showComments, setShowComments] = useState(false); // State to control showing comments

  const { usersData } = useContext(UserContext); // Use the UserContext here

  console.log("User logged in", usersData); // Check if the user data is available

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // const { user } = data;
  // const { posts } = user;

  const { user } = useContext();
  console.log(user);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-auto grid md:grid-cols-2 gap-4">
        {/* User Information */}
        <div className="bg-gray rounded-lg flex justify-center pt-20 max-h-96">
          <div className="bg-white rounded-[5rem] max-w-2xl container relative py-10">
            <p className="text-blue-900 text-center text-3xl font-bold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-blue-900 text-center">
              <strong>Email:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.email}</p>
            <p className="text-blue-900 text-center">
              <strong>Website:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.website}</p>
            <p className="text-blue-900 text-center">
              <strong>LinkedIn:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.linkedin}</p>
            <p className="text-blue-900 text-center">
              <strong>GitHub:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.github}</p>
          </div>
        </div>
        {/* Posts */}
        <div>
          {user.posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-xl mx-4 md:mx-auto max-w-md md:max-w-2xl my-6"
            >
              <PostHeader userID={user._id} />
              <div key={post._id} className="">
                <p className="-mt-8 text-slate-400 text-xs pl-4 pt-2">
                  Posted an update: {post.createdAt}
                </p>
                <div className="pl-20 pr-8">
                  <p className="mt-2 color-medblue text-xl">{post.postText}</p>
                </div>
                <div className="">{/* Rest of the component code */}</div>
              </div>
              <div className="grid justify-items-end pr-5 pb-2">
                <button
                  onClick={handleShowComments}
                  className="flex text-gray-700 text-sm bg-white rounded"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="color-dkblue w-4 h-4 mr-1"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  <span>Comment</span>
                </button>
                {showComments && (
                  <div className="w-full flex flex-col items-start mr-2 text-gray-700 text-sm mr-8">
                    {/* Render CreateComment and Comment components if showComments is true */}
                    <CreateComment postID={post._id} />
                    <Comment postID={post._id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
