import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommunityContainer from "../components/CommunityContainer";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";


const Home = () => {
  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Header />
          <CommunityContainer />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};


export default Home;
