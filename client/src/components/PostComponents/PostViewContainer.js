import React, { useContext, useEffect } from "react";
import PostCard from "./PostCard";

const PostViewContainer = () => {
  // Fetch all posts using the QUERY_POSTS query
  return (
    <div className="">
      <PostCard />
    </div>
  );
};

export default PostViewContainer;
