import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS, USER_BY_ID } from "../../utils/queries";
import CreateComment from "../CreateComment";
import Comment from "../Comment";
import PostHeader from "./PostHeader";

const PostCard = () => {
  const { loading, data, error } = useQuery(QUERY_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  const posts = data?.posts || [];

  console.log("postsData", posts);

  return (
    <div>
      {posts.map((post) => (
        <PostCardItem key={post._id} post={post} />
      ))}
    </div>
  );
};

const PostCardItem = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  console.log("Post from card item", post);
  console.log("Post.user from card item", post.user);
  console.log("Post.user._id from card item", post.user._id);

  // let props = {
  //   comments: post.comments,
  //   userId: post.user._id,
  // }
  
  return (
    <div className="bg-white shadow-lg rounded-xl mx-4 md:mx-auto max-w-md md:max-w-2xl my-6">
      <PostHeader userId={post.user._id} />
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
          <div className="w-full flex-col items-start text-gray-700 text-sm pl-5">
            {/* Render CreateComment and Comment components if showComments is true */}
            <CreateComment postID={post._id} />
            <Comment postID={post._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
