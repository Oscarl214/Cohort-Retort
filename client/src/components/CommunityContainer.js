import React from "react";
import CreatePost from "./CreatePost";
import PostViewContainer from "./PostCard";


const CommunityContainer = () => {
  return (
    <div className="">
        <CreatePost />
        <PostViewContainer />
    </div>
  );
};

export default CommunityContainer;
