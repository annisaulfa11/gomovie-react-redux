// src/components/SearchBar.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../redux/searchMovieSlice";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(fetchMovies(query));
      navigate('/search');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full justify-end"
    >
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 h-9 rounded-md focus:outline-none"
      />
    </form>
  );
}

export default SearchBar;
