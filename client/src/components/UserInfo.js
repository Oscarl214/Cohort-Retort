import React from "react";
import { useQuery } from "@apollo/client";

// Import the custom user query
import { QUERY_USER } from "../utils/queries";

const UserInfo = () => {
  const { data, loading, error } = useQuery(QUERY_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { user } = data; // Assuming the user data is under 'data.user' in the GraphQL response.
  const { posts } = user; // Assuming the posts data is under 'user.posts' in the GraphQL response.

  return (
    <div className="max-w-md md:max-w-2xl mx-auto left-0">
      {/* User Information */}
      <div className="flex items-start px-4 py-6">
        <img
          className="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {user.firstName} {user.lastName}
            </h2>
            <small className="text-sm text-gray-700">{user.email}</small>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div>
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card bg-white shadow-lg rounded-lg my-4 mx-4"
          >
            <div className="px-4 py-2">
              <p className="text-gray-700">{post.createdAt}</p>
              <p className="mt-3 text-gray-700 text-sm">{post.postText}</p>
              <div className="mt-4 flex items-center">
                {/* Rest of the component code */}
              </div>
            </div>
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
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
