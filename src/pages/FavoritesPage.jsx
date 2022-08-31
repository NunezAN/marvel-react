import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comic from "../components/Comic";
import {
  selectLoading,
  startLoading,
  stopLoading,
} from "../features/HeroSlice";
import { db } from "../firebase";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllFavorites() {
      dispatch(startLoading());
      const favoritesData = await getDocs(collection(db, "favorites"));
      const data = favoritesData.docs.map((comic) => ({
        ...comic.data(),
      }));
    //   console.log(data);
      setFavorites(data);
      dispatch(stopLoading());
    }

    // onSnapshot(collection(db, "favorites"), (snapshot) => {
    //   setFavorites(
    //     snapshot.docs.map((elem) => ({ id: elem.id, data: elem.data() }))
    //   );
    //   //   console.log(favorites);
    // });
    getAllFavorites();
  }, []);

  return (
    <div className="favoritesPage">
      <div className="favoritesPage__title--container">
        <h1 className="favoritePage__title">My Favorites</h1>
      </div>
      <div className="favoritesPage__comics--wrapper">
        {isLoading ? (
          <div className="loading__container">
            <FontAwesomeIcon icon={faSpinner} className="loading--icon spin" />
          </div>
        ) : (
          favorites.length > 0 && (
            <div className="comic__results">
              <div className="comic__results__comics--wrapper">
                {favorites.length > 0 &&
                  favorites.map((comic) => (
                    // console.log(comic)
                    <Comic key={comic.id} comicData={comic} fromFavorites/>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
