import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_POSTS } from "../../utils/queries";
import { UserContext } from "../../utils/userContext";
import PostCard from "./PostCard";
const PostViewContainer = () => {
  // Fetch all posts using the QUERY_POSTS query
  const {
    data: usersData,
    loading: userLoading,
    error: userError,
  } = useQuery(QUERY_USERS);
  const { setUsersData } = useContext(UserContext);
  useEffect(() => {
    if (usersData) {
      setUsersData(usersData.users);
    }
  }, [usersData, setUsersData]);
  console.log("usersData", usersData);

  return (
    <div className="">
      {/* Render all posts using the PostCard component */}
      {userLoading ? (
        <p>Loading...</p>
      ) : userError ? (
        <p>Error: {userError.message}</p>
      ) : usersData?.users?.length ? (
        usersData.users.map((user) => <PostCard key={user._id} post={user} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};
export default PostViewContainer;
