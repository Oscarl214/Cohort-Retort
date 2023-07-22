import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import PostHeader from "./PostHeader";
import CreateComment from "../CreateComment";
import Comment from "../Comment";

const PostCard = () => {
  // Fetch all posts using the QUERY_POSTS query
  const { data, loading, error } = useQuery(QUERY_POSTS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const posts = data.posts || [];

  return (
    <div>
      {posts.map((post) => (
        <>
          <div
            key={post._id}
            className="post-card flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl"
          >
          <PostHeader postID={post._id} />
            <div>
              <p className="text-gray-700">{post.createdAt}</p>
              <p className="mt-3 text-gray-700 text-sm">{post.postText}</p>
              <div className="mt-4 flex items-center">
                {/* Rest of the component code */}
              </div>
            </div>
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
          <CreateComment postID={post._id}/>
          <Comment />
          </div>
        </>
      ))}
    </div>
  );
};

export default PostCard;
