import React from "react";

const Comic = ({comicData}) => {
  return (
    <div class="comic">
      <figure class="comic__img--wrapper">
        <img
          class="comic__img"
          src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
          alt=""
        />
        <div class="comic__wrapper--background"></div>
        <div class="comic__description">
          <p class="comic__year">
            DATE RELEASED: {comicData.dates[0].date.substring(0, 10)}
          </p>
          <p class="comic__description--para">
            {comicData.description || "NO DESCRIPTION AVAILABLE"}
          </p>
        </div>
      </figure>

      <div class="comic__title">{comicData.title}</div>
    </div>
  );
};

export default Comic;
