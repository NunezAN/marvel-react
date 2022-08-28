import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./SearchPage.css";
import { useSelector } from "react-redux";
import { selectHeroData, selectSearchInput } from "../features/HeroSlice";
import axios from "axios";
const SearchPage = () => {
  const SearchInput = useSelector(selectSearchInput);
  const heroData = useSelector(selectHeroData);
  const [comicData, setComicData] = useState([]);

  useEffect(() => {
    async function getComicData(heroResults) {
      let allComicsData = [];
      for (let i = 0; i < heroResults.length; i++) {
        //fetch all the comic data from the hero ids
        let comicData = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${heroResults[i].id}/comics?limit=12&apikey=218ad171663f8304bfabed8c5e0ecd2d`
        );
        
        //convert the resulting data into an array
        const comicsData = comicData.data.data.results;
        allComicsData = allComicsData.concat(comicsData);
        //sum up the number of results
        //   resultsCount += comicsData.length;
      }
      setComicData(allComicsData);
    }
    getComicData(heroData);
    console.log(comicData);
  }, [heroData]);

  return (
    <div className="searchPage">
      <div className="searchPage__search">
        <h1 className="section__title section__title--search">
          Browse Our Comics
        </h1>
        <SearchBar />
      </div>
      <div className="searchPage__results">
        <p>{SearchInput}</p>
        {comicData.length > 0 && comicData.map((comic) => <p>{comic.title}</p>)}
      </div>
    </div>
  );
};

export default SearchPage;
