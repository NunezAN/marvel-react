import React, { useEffect, useState } from "react";
import "./ComicPage.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const ComicPage = () => {
  //   const [favorites, setFavorites] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const location = useLocation();
  const comicData = location.state;

  useEffect(() => {
    // async function getAllFavorites() {
    //   const favoritesData = await getDocs(collection(db, "favorites"));
    //   const data = favoritesData.docs.map((comic) => ({
    //     ...comic.data(),
    //     id: comic.id,
    //   }));
    //   console.log(data);
    // }

    // onSnapshot(collection(db, "favorites"), (snapshot) => {
    //   setFavorites(
    //     snapshot.docs.map((elem) => ({ id: elem.id, data: elem.data() }))
    //   );
    //   //   console.log(favorites);
    // });
    // getAllFavorites();
    async function checkFavorited() {
      const comicCollection = collection(db, "favorites");
      const q = query(comicCollection, where("id", "==", comicData.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.length > 0 && setFavorited(true);
    }
    checkFavorited();
  }, []);

  async function addToFavorites() {
    console.log("added to favorites");
    // console.log(comicData);
    await addDoc(collection(db, "favorites"), comicData);
    setFavorited(true);
  }
  async function removeFromFavorites() {
    console.log("removeFromFavorites");
    const comicCollection = collection(db, "favorites");
    const q = query(comicCollection, where("id", "==", comicData.id));
    const querySnapshot = await getDocs(q);
    const comicDocId= querySnapshot.docs[0].id;
    // console.log(comicDocId);
    await deleteDoc(doc(db,"favorites",comicDocId));
    setFavorited(false);
  }

  return (
    <div className="comicPage">
      <div className="comicPage__icons--wrapper">
        <Link to="/Search" className="comicPage__back--wrapper">
          <FontAwesomeIcon className="back--icon" icon={faArrowLeft} />
        </Link>
        {favorited ? (
          <FontAwesomeIcon
            className="favorite--icon glow-blue"
            icon={faStarSolid}
            onClick={() => removeFromFavorites()}
          />
        ) : (
          <FontAwesomeIcon
            className="favorite--icon glow-red"
            icon={faStarOutline}
            onClick={() => addToFavorites()}
          />
        )}
      </div>

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
