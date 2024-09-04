import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MovieList from "./MovieList";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTA5ZmJiYTM5Yjk3MTZjNmEwODY2MjAxMzM4NTMzYSIsIm5iZiI6MTcyMzk5NDQ0MC4zNDk2Nywic3ViIjoiNjZiYWEyNWZhYjFiZGIxYzBjYmRjYTk3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OkWeMrQTREMWtovtoCnC-EWWohCNmHkYXl3K35lkuo4",
    },
  };

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;

    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      setMovie(jsonData.results); // Access the 'results' array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {movie.map((movie) => (
            <Link
              key={movie.id} // Added key prop
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title} // Added alt attribute
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div className="posterImage__runtime">
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>

        <MovieList />
      </div>
    </>
  );
}
