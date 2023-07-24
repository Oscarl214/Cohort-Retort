import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";


const Comment = ({ postID }) => {
  const [comments, setComments] = useState([]);

  const { data, loading, error } = useQuery(QUERY_POST, {
    variables: { postID },
    fetchPolicy: "network-only",
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

  // console.log("Comments Array Post ID:", postID);
  // console.log("Comments Array:", comments);

  return (
    <div className="w-full max-w-xl items-stretch rounded-lg pt-1 p-3 mb-12 space-y-9">
      {comments.length > 0
        ? comments.map((comment) => (
            <div key={comment._id} className="">
              <div>
                <p className="pl-4 -mt-7 text-slate-400 text-xs pt-1 pb-6">Posted an update: {comment.createdAt}</p>
                <p className="color-medblue text-l pl-4 pr-4">{comment.commentText}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );

};
export default Comment;