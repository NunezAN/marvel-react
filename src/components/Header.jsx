import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="nav">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
            alt=""
            className="header__logo"
          />
        </Link>
        <div className="nav__links">
            <Link to="/" className="nav__link clickable">Home</Link>
            <Link to="/search" className="nav__link clickable">Find a Comic</Link>
            <Link to="/favorites" className="nav__link clickable">My Favorites</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
