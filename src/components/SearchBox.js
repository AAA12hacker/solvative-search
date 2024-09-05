import React, { useState, useEffect, useRef } from "react";
import "../css/SearchBox.css";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        focusSearchInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="search-box">
      <div className="search-container">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Search for places..."
          aria-label="Search"
        />
        <button
          type="button"
          className="focus-button"
          onClick={focusSearchInput}
          aria-label="Focus Search Box"
        >
          Ctrl + /
        </button>
      </div>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBox;
