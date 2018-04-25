import React from "react";
import "./Header.css";

const Header = () => (
  <div className="headerContainer">
    <div className="brandingContainer">
      <div className="logo">
        <h2>S</h2>
      </div>
      <h2 className="titleText">Slacker News</h2>
    </div>
    <nav className="navigation">
      <a href="/new">new</a> |
      <a href="/show">show</a> |
      <a href="/submit">submit</a>
    </nav>
  </div>
);

export default Header;
