import React, { useContext, useEffect } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommunityContainer from "../components/CommunityContainer";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const Home = () => {
  const { data: userData } = useQuery(QUERY_USER);
  const { usersData, setUsersData } = useContext(UserContext); // Use usersData instead of userData

  useEffect(() => {
    if (userData) {
      setUsersData(userData.user);
    }
  }, [userData, setUsersData]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <CommunityContainer className="mt-6"/>
      <Footer />
    </div>
  );
};

export default Home;
