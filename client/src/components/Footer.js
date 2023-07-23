import React, { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <div>
      <div className="hero w-full h-6"></div>

      <div className="px-4 py-2 border-b-0 background-darkBlue">
        <div className="text-center text-lg color-yellow">
          <p>© 2023 COHORT RETORT</p>
          <button onClick={toggleModal} className="underline hover:text-white">
            Contact Us
          </button>

          {showModal && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black"
              onClick={toggleModal}
            >
              <div
                className="rounded-lg p-8 background-medBlue color-ltgrey"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="mb-4 text-lg font-semibold color-yellow">Contacts</h2>
                <div className="mb-2">
                <p>Scott Hale-Developer</p>
                <a 
                  href="mailto:timmackie117@gmail.com"
                  className="hover:text-white"
                  style={{color: '#F0D258'}} // same as .color-yellow
                >
                  tbd
                </a>                
              </div>
              <div className="mb-2">
                <p>Oscar Leal-Developer</p>
                <a 
                  href="mailto:timmackie117@gmail.com"
                  className="hover:text-white"
                  style={{color: '#F0D258'}} // same as .color-yellow
                >
                  tbd
                </a>                
              </div>
              <div className="mb-2">
                <p>Mike (Blue & Yellow) Formico-Developer</p>
                <a 
                  href="mailto:timmackie117@gmail.com"
                  className="hover:text-white"
                  style={{color: '#F0D258'}} // same as .color-yellow
                >
                  tbd
                </a>                
              </div>
              <div className="mb-2">
                <p>Whitney White-Developer</p>
                <a 
                  href="mailto:timmackie117@gmail.com"
                  className="hover:text-white"
                  style={{color: '#F0D258'}} // same as .color-yellow
                >
                  tbd
                </a>                
              </div>
              <div className="mb-2">
                <p>Tim Mackie-Developer</p>
                <a 
                  href="mailto:timmackie117@gmail.com"
                  className="hover:text-white"
                  style={{color: '#F0D258'}} // same as .color-yellow
                >
                  timmackie117@gmail.com
                </a>                
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;