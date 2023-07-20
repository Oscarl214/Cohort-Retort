import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

//make a parent component that uses the user query
//fetch info we need
//bring it in to our postCard Component
//use it accordingly

const PostCard = () => {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName, github, posts } = userData;

  // Map through the posts array to render each post card
  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="post-card flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl"
        >
          <div className="flex items-start px-4 py-6">
            <img
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
              src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="avatar"
            />
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                  {firstName} {lastName}
                </h2>
                <small className="text-sm text-gray-700">
                  {post.createdAt}
                </small>
              </div>
              <p className="text-gray-700">Joined 12 SEP 2012.</p>
              <p className="mt-3 text-gray-700 text-sm">{post.postText}</p>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
