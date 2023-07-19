import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import CommunityContainer from "../components/CommunityContainer";

const Profile = () => {
  return (
    <div>
      <Header />
      <UserInfo />
      <CommunityContainer />
      <Footer />
    </div>
  );
};

export default Profile;