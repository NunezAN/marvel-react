import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ComicPage from "./pages/ComicPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Search/" element={<SearchPage />}/>
        <Route path="/Search/comic" element={<ComicPage />}/>
        <Route path="/Favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
