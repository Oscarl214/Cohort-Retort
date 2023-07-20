import React from "react";
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../utils/queries"; // Replace this with the actual user query
import { UserProvider } from "../UserContext";

import PostViewContainer from "./PostViewContainer";

const ParentComponent = () => {
  // Fetch the user data using the user query
  const { data, loading, error } = useQuery(USER_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Destructure the user data, assuming you have fields like firstName, lastName, etc.
  const userData = data.user;

  console.log(userData);
  // Pass the user data as props to the PostList component
  return (
    <UserProvider>
      <PostViewContainer userData={userData} />
    </UserProvider>
  );
};

export default ParentComponent;
