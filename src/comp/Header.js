import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  return (
    <header className="header">
      
      <h2 className="header-logo">
        <Link to="/">MovieDB</Link>
      </h2>

     
      <div className="header-right">
        <nav className="header-nav">
          <Link to="/" className="nav-link">Popular</Link>
          <Link to="/top-pick" className="nav-link">Top Rated</Link>
          <Link to="/upcoming" className="nav-link">Upcoming</Link>
        </nav>

       
        <form className="header-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Movie Name"
            className="search-input"
            value={search}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
