import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import { UserContext } from "../utils/userContext";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {

  const { data: userData, loading, error } = useQuery(QUERY_USER);
  const { usersData, setUsersData } = useContext(UserContext); // Use usersData instead of userData

  useEffect(() => {
    if (userData) {
      setUsersData(userData.user);
    }
  }, [userData, setUsersData]);

 if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}



const data = userData;
const user = data.user;
 console.log("user in profile", data);
 console.log("user in profileasfafasf", user);


  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50"><Header /></div>
      <div className="pt-80"><UserInfo/></div>
      <Footer />
    </div>
  );
};

export default Profile;
