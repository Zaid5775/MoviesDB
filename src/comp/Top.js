import React, { useEffect, useState } from "react";
import Card from "./MovieCard";
import ReactPaginate from "react-paginate";

const Top = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const topurl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`;
  const searchUrl = (query, page) =>
    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=${page}`;

  useEffect(() => {
    const url = searchQuery ? searchUrl(searchQuery, currentPage) : topurl;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [searchQuery, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div>
      <div className="head">
        <h2>{searchQuery ? "" : "Top Rated"}</h2>
      </div>

      <div className="movie-grid">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
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

      <div className="pagination">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination-container"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Top;
