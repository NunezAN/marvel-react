import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./SearchPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHeroData,
  selectLoading,
  selectSearchInput,
  startLoading,
  stopLoading,
} from "../features/HeroSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Comic from "../components/Comic";
const SearchPage = () => {
  const searchInput = useSelector(selectSearchInput);
  const heroData = useSelector(selectHeroData);
  const [comicData, setComicData] = useState([]);
  const [comicCount, setComicCount] = useState(0);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    async function getComicData(heroResults) {
      dispatch(startLoading());
      let allComicsData = [];
      let comicCounter = 0;
      for (let i = 0; i < heroResults.length; i++) {
        //fetch all the comic data from the hero ids
        let comicData = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${heroResults[i].id}/comics?limit=12&apikey=218ad171663f8304bfabed8c5e0ecd2d`
        );

        //convert the resulting data into an array
        const comicsData = comicData.data.data.results;
        allComicsData = allComicsData.concat(comicsData);
        //sum up the number of results
        comicCounter += comicsData.length;
      }
      setComicData(allComicsData);
      setComicCount(comicCounter);
      dispatch(stopLoading());
      console.log(allComicsData);
    }
    getComicData(heroData);
    // console.log(comicData);
  }, [heroData]);

  return (
    <div className="searchPage">
      <div className="searchPage__search">
        <h1 className="section__title section__title--search">
          Browse Marvel Comics
        </h1>
        <SearchBar />
      </div>
      <div className="comics__header">
        <h2 className="section__title">All Comics</h2>
      </div>
      <div className="searchPage__results">
        {isLoading ? (
          <div className="loading__container">
            <FontAwesomeIcon icon={faSpinner} className="loading--icon spin" />
          </div>
        ) : (
          searchInput.length > 0 && (
            <div className="comic__results">
              <span className="results__text">
                Found {comicCount} results containing the hero name "
                {searchInput}".{" "}
                {comicCount === 0 &&(
                  `Also try entering the first letters of the heroes name. (e.g. \"spid\" for spider-man)`)}
              </span>
              <div className="comic__results__comics--wrapper">
                {comicData.length > 0 &&
                  comicData.map((comic) => (
                    <Comic key={comic.id} comicData={comic} />
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
