import React, { useEffect, useState } from "react";
import Card from "./MovieCard";
import ReactPaginate from "react-paginate"; // Importing the library

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Store total pages
  const [loading, setLoading] = useState(false);

  const popurl = `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`;
  const searchUrl = (query, page) =>
    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=${page}`;

  // Fetch movies data
  useEffect(() => {
    const url = searchQuery ? searchUrl(searchQuery, currentPage) : popurl;
    setLoading(true); // Start loading
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages); // Set the total pages from the API response
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false); // Stop loading even on error
      });
  }, [searchQuery, currentPage]); // Re-run the effect when currentPage or searchQuery changes

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1); // React Paginate gives 0-based index
  };

  return (
    <div>
      <div className="head">
        <h2>{searchQuery ? "" : "Popular"}</h2>
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

      {/* Pagination using React Paginate */}
      <div className="pagination">
        <ReactPaginate
          pageCount={totalPages} 
          pageRangeDisplayed={3} 
          marginPagesDisplayed={1} 
          onPageChange={handlePageChange} 
          containerClassName="pagination-container"
          activeClassName="active" 
        />
      </div>
    </div>
  );
};

export default Home;
