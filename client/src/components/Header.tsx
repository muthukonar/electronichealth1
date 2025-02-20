// import React from "react";
import doc1 from "../assets/doc1.png";
import doc2 from "../assets/doc2.png";

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Left Image */}
          <img src={doc1} alt="Doc1" className="header-img" style={{ height: "40px" }} />
          
          {/* Centered Title */}
          <h1 className="m-0">Family Doctors Connection</h1>
          
          {/* Right Image */}
          <img src={doc2} alt="Doc2" className="header-img" style={{ height: "40px" }} />
        </div>
      </nav>
    </header>
  );
};

export default Header;

