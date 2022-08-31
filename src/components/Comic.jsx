import React from "react";
import { Link } from "react-router-dom";
import "./Comic.css";

const Comic = ({ comicData, fromFavorites }) => {
  return (
    <Link
      to="/Search/comic"
      className="comic"
      state={{ data: comicData, favorited: fromFavorites }}
    >
      <figure className="comic__img--wrapper">
        <img
          className="comic__img"
          src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
          alt=""
        />
      </figure>

      <div className="comic__title">{comicData.title}</div>
    </Link>
  );
};

export default Comic;
