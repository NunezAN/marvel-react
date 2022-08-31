import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { removeHeroData, removeSearchInput } from "../features/HeroSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  function resetData() {
    dispatch(removeHeroData());
    dispatch(removeSearchInput());
  }
  return (
    <div className="header">
      <div className="nav">
        <Link to="/" onClick={() => resetData()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
            alt=""
            className="header__logo"
          />
        </Link>
        <div className="nav__links">
          <Link
            to="/"
            className="nav__link clickable"
            onClick={() => resetData()}
          >
            Home
          </Link>
          <Link
            to="/search"
            className="nav__link clickable nav__link--searchComics"
            onClick={() => resetData()}
          >
            Find a Comic
          </Link>
          <Link
            to="/favorites"
            className="nav__link clickable"
            onClick={() => resetData()}
          >
            My Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
