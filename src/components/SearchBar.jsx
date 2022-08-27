import React from "react";
import "./SearchBar.css";
import { useForm } from "react-hook-form";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const SearchBar = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
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
    return allComicsData;
  }

  async function getHeroIds(heroName) {
    const heroDataStartsWithId = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&apikey=218ad171663f8304bfabed8c5e0ecd2d`
    );
    console.log(heroDataStartsWithId.data.data.results);

    //concat the data from starts with to the hero array
    let heroData = heroDataStartsWithId.data.data.results;
    //return null if no results were found
    if (heroData.length === 0) {
      return null;
    }
    //return the array of matching hero objects
    return heroData;
  }

  async function onSubmit(formData) {
    console.log(formData);
    let heroResults = await getHeroIds(formData.searchInput);
    console.log(heroResults);
    if (heroResults !== null) {
      let comicsResults = await getComicData(heroResults);
      console.log(comicsResults);
    }
    reset();
  }
  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit(onSubmit)} className="input__wrapper">
        <input
          className="input__box"
          type="text"
          placeholder="Seach by comic book character"
          {...register("searchInput", { required: true })}
        />
        <button className="search__button sb__clickable" type="submit">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="searchbar__icon"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
