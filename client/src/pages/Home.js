import React from "react";
import Nav from "../components/Nav";
import CommunityContainer from "../components/CommunityContainer";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <Nav />
      <CommunityContainer>
        
      </CommunityContainer>
    </div>
  );
};


export default Home;
