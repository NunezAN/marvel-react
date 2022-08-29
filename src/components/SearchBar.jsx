import React from "react";
import "./SearchBar.css";
import { useForm } from "react-hook-form";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  startLoading,
  stopLoading,
  setHeroData,
  removeHeroData,
  setSearchInput,
} from "../features/HeroSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  async function getHeroIds(heroName) {
    const heroDataStartsWithId = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&apikey=218ad171663f8304bfabed8c5e0ecd2d`
    );
    // console.log(heroDataStartsWithId.data.data.results);

    //concat the data from starts with to the hero array
    let heroData = heroDataStartsWithId.data.data.results;
    //return null if no results were found
    if (heroData.length === 0) {
      return null;
    }
    //return the array of matching hero objects
    dispatch(setHeroData(heroData));
    return heroData;
  }

  async function onSubmit(formData) {
    dispatch(setSearchInput(formData.searchInput));
    dispatch(startLoading());
    let heroResults = await getHeroIds(formData.searchInput);
    if (heroResults !== null) {
    //   let comicsResults = await getComicData(heroResults);
    //   console.log(comicsResults);
      reset();
      navigate("/search");
    }
    
  }
  return (
    <div className="searchBar">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="input__wrapper"
        autoComplete="off"
      >
        <input
          className="input__box"
          type="text"
          placeholder="Seach by comic book character"
          {...register("searchInput", { required: true })}
        />
        <button className="search__button sb__clickable" type="submit">
          {isLoading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="searchbar__icon spin"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchbar__icon"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
