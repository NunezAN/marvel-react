import React from "react";
import "./SearchBar.css";
import { useForm } from "react-hook-form";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  function onSubmit(formData) {
    console.log(formData);
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
        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar__icon"/>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
