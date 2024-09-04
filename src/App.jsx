import "./App.css";
import Navigation from "./Navigation";
import Home from "./Home";
import MovieList from "./MovieList";
import TvList from "./TvList";
import DetailsMovie from "./DetailsMovie";
import DetailsTv from "./DetailsTv";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:type" element={<MovieList />} />

        <Route path="/tv" Component={TvList} />
        <Route path="/movie/:id" Component={DetailsMovie} />
        <Route path="/tv/:id" Component={DetailsTv} />
      </Routes>
    </div>
  );
}

export default App;
