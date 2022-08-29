import React from "react";
import { useLocation } from "react-router-dom";

const ComicPage = () => {
  const location = useLocation();
  const comicData = location.state;
  return (
    <>
      <h1>{comicData.title}</h1>
      <img
        className="comic__img"
        src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
        alt=""
      />
      <p className="comic__year">
        DATE RELEASED: {comicData.dates[0].date.substring(0, 10)}
      </p>
      <p className="comic__description--para">
        {comicData.description || "NO DESCRIPTION AVAILABLE"}
      </p>
      <p>
        Series: {comicData.series.name}
      </p>
      <p>Page Count {comicData.pageCount}</p>
      <p>Price: ${comicData.prices[0].price}</p>
    </>
  );
};

export default ComicPage;
