import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import loadingImage from "./assets/loading.gif";

export default function MovieList() {
  const BASE_URL = "https://media.themoviedb.org/t/p/w220_and_h330_face";
  const { type } = useParams();
  const [movieList, setMovieList] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchData();
  }, [type]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTA5ZmJiYTM5Yjk3MTZjNmEwODY2MjAxMzM4NTMzYSIsIm5iZiI6MTcyMzk5NDQ0MC4zNDk2Nywic3ViIjoiNjZiYWEyNWZhYjFiZGIxYzBjYmRjYTk3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OkWeMrQTREMWtovtoCnC-EWWohCNmHkYXl3K35lkuo4",
    },
  };

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${
      type ? type : "now_playing"
    }?language=en-US&page=1`;

    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      setMovieList(jsonData.results); // Access the 'results' array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (movieList.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {(type ? type : "now playing").toUpperCase()}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        {movieList.map((item) => (
          <div className="movie-card" key={item.id}>
            <Link to={`/movie/${item.id}`}>
              <img
                src={`${BASE_URL}${item.poster_path}`}
                alt={item.title} // Add an alt attribute for accessibility
              />
              <p>{item.title.split(" ").slice(0, 2).join(" ")}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
