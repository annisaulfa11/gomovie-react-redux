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
        className=" px-4 h-9 sm:w-44 lg:w-fit s:h-7 s:w-40 s:text-sm rounded-md focus:outline-none"
      />
    </form>
  );
}

export default SearchBar;
