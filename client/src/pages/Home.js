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

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <CommunityContainer />
      <Footer />
    </div>
  );
};

export default Home;
