import React from "react";
import CreateComment from "./CreateComment";
import Comment from "./Comment";

const PostCard = () => {
  return (
    <div className="">
        {/* Post Info */}

        <CreateComment />
        
        <Comment />
        
    </div>
  );
};

export default PostCard;