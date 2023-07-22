// import React from "react";
// import { useQuery } from "@apollo/client";
// import { USERS_QUERY } from "../utils/queries"; // Replace this with the actual user query
// import { UserProvider } from "../UserContext";

// import PostViewContainer from "./PostViewContainer";

// const ParentComponent = () => {
//   // Fetch the user data using the user query
//   const { data, loading, error } = useQuery(USERS_QUERY);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   // Pass the user data as props to the PostList component
//   return (
//     <UserProvider>
//       <PostViewContainer usersData={data} />
//     </UserProvider>
//   );
// };

// export default ParentComponent;
