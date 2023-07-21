import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommunityContainer from "../components/CommunityContainer";

const Home = () => {
  return (
    <div className="background-gray h-screen"> 
      <Header />
      <CommunityContainer />
      <Footer />
    </div>
  );
};

export default Home;
