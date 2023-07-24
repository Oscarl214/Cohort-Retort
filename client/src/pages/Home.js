import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommunityContainer from "../components/CommunityContainer";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";


const Home = () => {
  return (
    <div>
      
      <Header />
      <CommunityContainer>
        
      </CommunityContainer>
      <Footer />
    </div>
  );
};


export default Home;
