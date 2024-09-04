import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadingImage from "./assets/loading.gif";
import "./App.css";

export default function TvList() {
  const BASE_URL = "https://media.themoviedb.org/t/p/w220_and_h330_face";
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTA5ZmJiYTM5Yjk3MTZjNmEwODY2MjAxMzM4NTMzYSIsIm5iZiI6MTcyMzUwNzgyOS41MzUxMjUsInN1YiI6IjY2YmFhMjVmYWIxYmRiMWMwY2JkY2E5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F2FA3aZhsXPvBQaDUHKE-xwgUJyPxPch_hHUjIzE5Mc",
      },
    };
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        options
      );
      const jsonData = await response.json();
      setData(jsonData.results || []);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (data.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={loadingImage} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "5px",
        marginTop: "20px",
      }}
    >
      {data.map((item) => (
        <div
          className="hover-effect"
          style={{ border: "0.5px solid grey" }}
          key={item.id}
        >
          <Link to={`/tv/${item.id}`}>
            <img
              className="movie-poster"
              src={`${BASE_URL}${item.poster_path}`}
            />
            <p style={{ textAlign: "center" }}>
              {item.name.split(" ").slice(0, 2).join(" ")}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
