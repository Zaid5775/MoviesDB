import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, rating, poster_path, title }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="card">
      <Link to={`/movie/${id}`}>
        <img
          src={imageUrl} 
          alt={title}
          className="card-image"
        />
        <div className="card-content">
          <h3>{title}</h3>
          <p>Rating: {rating.toFixed(1)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
