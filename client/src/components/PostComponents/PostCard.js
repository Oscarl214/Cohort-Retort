import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

import PostHeader from "./PostHeader";
//make a parent component that uses the user query
//fetch info we need
//bring it in to our postCard Component
//use it accordingly

const PostCard = () => {
  const { usersData } = useContext(UserContext);

  if (!usersData) {
    return <p>Loading...</p>;
  }

  // Map through the posts array to render each post card
  return (
    <div className="post-card flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl">
      <PostHeader />
      <p className="text-gray-700"></p>
      <p className="mt-3 text-gray-700 text-sm"></p>
      <div className="mt-4 flex items-center">
        <div className="flex mr-2 text-gray-700 text-sm mr-3">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-1"
            stroke="currentColor"
          >
            {/* Rest of the SVG code */}
          </svg>
          <span>12</span>
        </div>
        <div className="flex mr-2 text-gray-700 text-sm mr-8">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-1"
            stroke="currentColor"
          >
            {/* Rest of the SVG code */}
          </svg>
          <span>8</span>
        </div>
        <div className="flex mr-2 text-gray-700 text-sm mr-4">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-1"
            stroke="currentColor"
          >
            {/* Rest of the SVG code */}
          </svg>
          <span>share</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
