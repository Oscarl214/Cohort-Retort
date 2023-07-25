import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_BY_ID } from "../utils/queries";
import CreateComment from "../components/CreateComment";
import Comment from "../components/Comment";
import PostHeader from "./PostComponents/PostHeader";
import UpdateUserInfo from "./UpdateUserInfo";

const UserInfo = ({ user }) => {
  const [expandedPosts, setExpandedPosts] = useState({}); // State to track expanded posts

  const handleShowComments = (postId) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [postId]: !prevExpandedPosts[postId] || false,
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid md:grid-cols-2 gap-4">
        {/* User Information */}
        <div className="bg-gray rounded-lg flex justify-center pt-6 max-h-96">
          <div className="bg-white rounded-xl rounded-t-xl border-t-4 border-blue-900 max-w-2xl container relative py-8 shadow-md shadow-slate-400">
            <p className="text-blue-900 text-center text-3xl font-bold">
              {user.username}
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
            <div className="flex justify-center pt-6">
              <UpdateUserInfo user={user} />
            </div>
          </div>
        </div>
        {/* Posts */}
        <div className="">
          {user.posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md shadow-slate-400 rounded-xl mx-4 md:mx-auto max-w-md md:max-w-2xl my-6"
            >
              <PostHeader userId={user._id} postId={post._id} />
              <div key={post._id} className="">
                <p className="-mt-8 text-slate-400 text-xs pl-12 pt-3">
                  Created on: {post.createdAt}
                </p>
                <div className="pl-12 pr-10">
                  <p className="mt-2 color-medblue text-l pb-6">{post.postText}</p>
                </div>
              </div>
              <div className="grid justify-items-end pr-5 pb-8">
                <button
                  onClick={() => handleShowComments(post._id)}
                  className="flex text-gray-700 text-sm pr-8 rounded"
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
                {expandedPosts[post._id] && (
                  <div className="w-full flex-col items-start text-gray-700 text-sm pl-5 p-3">
                    {/* Render CreateComment and Comment components if showComments is true */}
                    <CreateComment postID={post._id} />
                    <Comment props={{ postID: post._id, userId: user._id }} />
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
