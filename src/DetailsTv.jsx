import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import loadingImage from "./assets/loading.gif";

export default function DetailsMovie() {
  const [details, setDetails] = useState(null); // Initialize with null

  const { id } = useParams(); // Get the movie ID from the URL

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
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
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        options
      );
      const jsonData = await response.json();
      setDetails(jsonData); // Set the movie details object directly
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!details) {
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

        marginTop: "20px",
        flexDirection: "column",
        alignItems: "center",

        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2>{details.title || details.name}</h2>
      <img
        className="backdrop_image"
        src={`https://image.tmdb.org/t/p/original${
          details ? details.backdrop_path : ""
        }`}
      />
      <img
        style={{ height: "280px", marginTop: "-90px" }}
        src={`https://image.tmdb.org/t/p/original${
          details ? details.poster_path : ""
        }`}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "400px",
        }}
      >
        <p>{details.overview}</p>
        <p>Release Date: {details.release_date || details.first_air_date}</p>
        <p>Rating: {details.vote_average}</p>
        <div></div>

        <div>Useful Links</div>
        {details.homepage && (
          <a
            href={details.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span>
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
            <p>
              <span>
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {details && details.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + details.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span>
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div>Production companies</div>
      <div>
        {details &&
          details.production_companies &&
          details.production_companies.map((company) => (
            <div key={company.id}>
              {company.logo_path && (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "rows",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <img
                    style={{
                      height: "24px",

                      display: "flex",
                    }}
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
