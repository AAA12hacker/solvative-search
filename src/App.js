import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import PlacesTable from "./components/PlacesTable";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 });
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}geo/cities`,
        {
          params: {
            offset: pagination.offset,
            limit: pagination.limit,
            namePrefix: searchTerm,
          },
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      setPlaces(response.data.data);
      setTotalCount(response.data.metadata.totalCount);
    } catch (err) {
      if (err.response && err.response.status === 429) {
      } else {
        setError("Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }
  }, [pagination, searchTerm]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, offset: 0 }));
  };

  const handlePaginationChange = (newOffset) => {
    setPagination((prev) => ({ ...prev, offset: newOffset }));
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 10) {
      alert("Maximum limit is 10 items per page");
      return;
    }

    setPagination((prev) => ({ ...prev, limit: value }));
    setItemsPerPage(value);
  };

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} />
      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <PlacesTable places={places} />
      <div className="pagination">
        {places.length > 0 && (
          <>
            <button
              onClick={() =>
                handlePaginationChange(
                  Math.max(pagination.offset - pagination.limit, 0)
                )
              }
              disabled={pagination.offset === 0}
            >
              Prev
            </button>
            <input
              type="number"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              min="1"
              max="10"
            />
            <button
              onClick={() =>
                handlePaginationChange(
                  Math.min(
                    pagination.offset + pagination.limit,
                    totalCount - pagination.limit
                  )
                )
              }
              disabled={pagination.offset + pagination.limit >= totalCount}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
