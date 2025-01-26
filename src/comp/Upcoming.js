import React, { useEffect, useState } from "react";
import Card from "./MovieCard";

const Upcoming = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);

  const upurl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1";

  const searchUrl = (query) =>
    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=1`;

  useEffect(() => {
    const url = searchQuery ? searchUrl(searchQuery) : upurl;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [searchQuery]); // Rerun the effect when sq changes

  return (
    <div>
      <div className="head">
        <h2>{searchQuery ? "" : "Upcoming"}</h2>
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              poster_path={movie.poster_path}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
