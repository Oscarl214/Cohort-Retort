import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommunityContainer from "../components/CommunityContainer";

const Home = () => {
  return (
    <div className="background-gray"> 
      <Header />
      <CommunityContainer />
      <Footer />
    </div>
  );
};

export default Home;
