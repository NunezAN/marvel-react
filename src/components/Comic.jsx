import React from "react";
import "./Comic.css"

const Comic = ({comicData}) => {
  return (
    <div class="comic">
      <figure class="comic__img--wrapper">
        <img
          class="comic__img"
          src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
          alt=""
        />
      </figure>

      <div class="comic__title">{comicData.title}</div>
    </div>
  );
};

export default Comic;
