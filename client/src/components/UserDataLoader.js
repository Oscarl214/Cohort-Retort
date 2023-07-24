import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UserProvider } from "../utils/userContext";

const UserDataLoader = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  // Show a loading state while data is being fetched

  // Provide the userData to the UserProvider once it's available
  return <UserProvider userData={userData}>{children}</UserProvider>;
};

export default UserDataLoader;
