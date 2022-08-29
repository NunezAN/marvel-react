import React from "react";
import "./ComicPage.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ComicPage = () => {
  const location = useLocation();
  const comicData = location.state;
  return (
    <div className="comicPage">
      <Link to="/Search" className="comicPage__back--wrapper">
        <FontAwesomeIcon className="back--icon" icon={faArrowLeft} />
      </Link>
      <div className="comicPage__container">
        <div className="comicPage__img--wrapper">
          <img
            className="comicPage__img"
            src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="comicPage__details--wrapper">
          <div className="comicPage__details__title--wrapper">
            <h1 className="comicPage__title">{comicData.title}</h1>
          </div>
          <div className="comicPage__details">
            <h1 className="comicPage__details__title">Comic Details</h1>
            <p className="comic__details__para">
              <span className="comicPage__details--subtitle">
                DATE RELEASED:{" "}
              </span>{" "}
              {comicData.dates[0].date.substring(0, 10)}
            </p>
            <p className="comic__details__para">
              <span className="comicPage__details--subtitle">
                Description:{" "}
              </span>
              {comicData.description || "NO DESCRIPTION AVAILABLE"}
            </p>
            <p className="comic__details__para">
              <span className="comicPage__details--subtitle">Series:</span>{" "}
              {comicData.series.name}
            </p>
            <p className="comic__details__para">
              <span className="comicPage__details--subtitle">Page Count:</span>{" "}
              {comicData.pageCount}
            </p>
            <p className="comic__details__para">
              <span className="comicPage__details--subtitle">Price:</span> $
              {comicData.prices[0].price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicPage;
