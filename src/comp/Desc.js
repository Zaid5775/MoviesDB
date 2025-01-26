import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const Desc = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const castData = await castResponse.json();
        setCast(castData.cast || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div className="movie-container">
      {/* Header Section */}
      <header className="movie-header">
        <div className="movie-info-container">
          <div className="movie-info">
            <img
              src={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h1>{movie.title}</h1>
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
              <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
              <p>
                <strong>Release Date:</strong>
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
          </div>

       
          <div className="overview-section">
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>

    
        <section className="movie-backdrop">
          <img
            src={`${IMAGE_BASE_URL}w780${movie.backdrop_path}`}
            alt="Backdrop"
            className="backdrop-image"
          />
        </section>
      </header>

   
      <section className="movie-cast">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}w200${actor.profile_path}`
                    : "/default-profile.jpg"
                }
                alt={actor.name}
                className="cast-image"
              />
              <div className="cast-details">
                <h4>{actor.name}</h4>
                <p>as {actor.character || "Unknown Role"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Desc;
