import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import PostHeader from "./PostComponents/PostHeader";

const Comment = (props) => {
  
  console.log("props to comment", props);
  const [comments, setComments] = useState([]);

  const postID = props.props.postID;
  const userId = props.props.userId;

  console.log("postID from props", postID);
  console.log("userId from props", userId);
  

  const { data, loading, error } = useQuery(QUERY_POST, {
    variables: { postID },
  });

  useEffect(() => {
    if (data && data.post) {
      setComments(data.post.comments);
    }
  }, [data]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className="w-full items-stretch rounded-lg pt-1 p-6 mb-12 space-y-9">
      {comments.length > 0
        ? comments.map((comment) => (
            <div key={comment._id} className="-pr-6">
            <PostHeader userId={userId} />
              <div>
                <p className="pl-4 -mt-7 text-slate-400 text-xs pt-3 pb-6">Created on: {comment.createdAt}</p>
                <p className="color-medblue text-l pl-4 ">{comment.commentText}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
export default Comment;