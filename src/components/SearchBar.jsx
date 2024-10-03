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
      navigate("/gomovie-react-redux/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-end">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border lg:px-4 lg:h-9 rounded-md focus:outline-none s:h-5 s:text-sm s:px-2 s:rounded-md s:w-fit sm:w-40 sm:h-7 lg:w-fit sm:rounded-md"
      />
    </form>
  );
}

export default SearchBar;
