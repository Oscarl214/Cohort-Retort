import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import { UserContext } from "../utils/userContext";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {

 const {data, loading, error} = useQuery(QUERY_USER);

 if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}

const user = data?.user;

 console.log("user in profile", user);

  return (
    <div>
      <Header />
      <UserInfo user={user}/>
      <Footer />
    </div>
  );
};

export default Profile;
