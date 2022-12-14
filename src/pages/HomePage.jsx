import React from "react";
import SearchBar from "../components/SearchBar";
import Heroes from "../components/home__heroes.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homePage--container">
        <div className="homePage__left">
          <h1 className="homePage__title">EXPLORE THE MARVEL COMIC UNIVERSE</h1>
          <p className="homePage__para">
            Start by entering any heros name from the Marvel universe and find
            details on all their available comics.
            <br /><br/>
            You can add/remove any comic to/from your favorites by selecting the star on the
            top right of any comic's detail screen.
          </p>
          <SearchBar />
        </div>
        <div className="homePage__right">
          <img className="homePage__img" src={Heroes} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
