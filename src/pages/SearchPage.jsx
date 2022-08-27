import React from "react";
import SearchBar from "../components/SearchBar";
import "./SearchPage.css";

const SearchPage = () => {
  return (
    <div className="searchPage">
      <div className="searchPage__search">
        <h1 className="section__title section__title--search">Browse Our Comics</h1>
        <SearchBar/>
      </div>
      <div className="searchPage__results"></div>
    </div>
  );
};

export default SearchPage;
