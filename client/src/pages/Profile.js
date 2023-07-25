import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import { UserContext } from "../utils/userContext";

const Profile = () => {
  const userData = useContext(UserContext);
  const user = userData.usersData;
  console.log("userInfo on profile", user);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50"><Header /></div>
      <div className="pt-80"><UserInfo user={user}/></div>
      <Footer />
    </div>
  );
};

export default Profile;
