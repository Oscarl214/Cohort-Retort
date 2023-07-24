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
      <Header />
      <UserInfo user={user}/>
      <Footer />
    </div>
  );
};

export default Profile;
