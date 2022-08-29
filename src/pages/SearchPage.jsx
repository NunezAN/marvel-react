import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./SearchPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHeroData,
  selectLoading,
  selectSearchInput,
  stopLoading,
} from "../features/HeroSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const SearchPage = () => {
  const searchInput = useSelector(selectSearchInput);
  const heroData = useSelector(selectHeroData);
  const [comicData, setComicData] = useState([]);
  const [comicCount, setComicCount] = useState(0);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    async function getComicData(heroResults) {
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
    }
    getComicData(heroData);
    console.log(comicData);
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
          <FontAwesomeIcon icon={faSpinner} className="searchbar__icon spin" />
        ) : (
          searchInput.length > 0 && (
            <div className="comic__results">
              <span class="results__text">
                Found {comicCount} results containing the hero name "
                {searchInput}"{" "}
              </span>
              <div className="comic__results__comics--wrapper">
                {comicData.length > 0 &&
                  comicData.map((comic) => (
                    <div class="comic">
                      <figure class="comic__img--wrapper">
                        <img
                          class="comic__img"
                          src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                          alt=""
                        />
                        <div class="comic__wrapper--background"></div>
                        <div class="comic__description">
                          <p class="comic__year">
                            DATE RELEASED:{" "}
                            {comic.dates[0].date.substring(0, 10)}
                          </p>
                          <p class="comic__description--para">
                            {comic.description || "NO DESCRIPTION AVAILABLE"}
                          </p>
                        </div>
                      </figure>

                      <div class="comic__title">{comic.title}</div>
                    </div>
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
