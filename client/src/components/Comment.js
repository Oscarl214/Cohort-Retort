import React, { useState, useEffect} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import PostHeader from "./PostComponents/PostHeader";

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

 
  console.log("Comments Array Post ID:", postID);
  console.log("Comments Array:", comments);


  return (
    <div className="text bg-red-700">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="">
            <PostHeader postID={postID} />
            <div>
              <p className="">{comment.createdAt}</p>
              <p className="">{comment.commentText}</p>
            </div>
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
};
export default Comment;
