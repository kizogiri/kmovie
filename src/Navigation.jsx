import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-around",
        background: "#14213d",

        alignItems: "center",
        margin: "0",
      }}
    >
      <ul style={{ display: "flex" }}>
        <li
          style={{
            listStyle: "none",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          <Link to="/" className="link">
            HOME
          </Link>
        </li>

        <li style={{ listStyle: "none", margin: "10px", cursor: "pointer" }}>
          <Link to="/movies/popular" className="link">
            POPULAR
          </Link>
        </li>
        <li style={{ listStyle: "none", margin: "10px", cursor: "pointer" }}>
          <Link to="/movies/top_rated" className="link">
            TOP RATED
          </Link>
        </li>

        <li style={{ listStyle: "none", margin: "10px", cursor: "pointer" }}>
          <Link to="/tv" className="link">
            TV{" "}
          </Link>
        </li>
      </ul>
    </header>
  );
}
