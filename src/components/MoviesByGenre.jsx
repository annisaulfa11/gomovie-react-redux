import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchGenres, fetchMoviesByGenre } from "../redux/genreMovieSlice";

function MovieList() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the genreId from the URL
  const { genres, moviesByGenre, status } = useSelector(
    (state) => state.genreMovie
  );

  // State to handle the current page
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state for transition
  const totalPages = moviesByGenre[id]?.totalPages || 1; // Default to 1 if no data

  // Find the genre name by matching the id
  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);

  const genreId = Number(id); // Convert id to a number
  const genreName =
    genres.length > 0
      ? genres.find((genre) => genre.id === genreId)?.name
      : null;

  useEffect(() => {
    if (id) {
      setLoading(true); // Start loading animation
      setTimeout(() => {
        dispatch(fetchMoviesByGenre({ id, page })).finally(() => {
          setLoading(false); // Stop loading when fetch is done
        });
      }, 500); // Half-second delay to enhance the effect
    }
  }, [id, page, dispatch]);

  // Handler for changing pages
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      
      // Scroll to the top of the page smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll to top
      });
    }
  };

  // Calculate the range of page numbers to display (5 pages at a time)
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(page - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Adjust if we are at the last pages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="flex flex-wrap gap-6 justify-between px-20 py-24 s:px-6 overflow-hidden min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <div className="border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        moviesByGenre[id] && (
          <div className="genre-section w-full mb-10 transition-all duration-500 ease-in-out">
            <h3 className="text-white font-semibold text-xl mb-10">
              Movies in <b>{genreName || "Unknown Genre"}</b> Genre
            </h3>
            <div className="flex gap-6 s:gap-3 flex-wrap justify-around">
              {moviesByGenre[id].all.map((movie) => (
                <div
                  key={movie.id}
                  className="transition-transform transform hover:scale-105"
                >
                  <Link to={`/gomovie-react-redux/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-md max-w-none s:w-28"
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 gap-4 items-center">
              {/* First and Previous buttons */}
              <button
                onClick={() => handlePageChange(1)}
                className="text-white px-2 py-1 rounded-full hover:bg-gray-700 s:px-0"
                disabled={page === 1}
              >
                «
              </button>
              <button
                onClick={() => handlePageChange(page - 1)}
                className="text-white px-2 py-1 rounded-full hover:bg-gray-700 s:px-0"
                disabled={page === 1}
              >
                ←
              </button>

              {/* Display page numbers dynamically */}
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${
                    page === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next and Last buttons */}
              <button
                onClick={() => handlePageChange(page + 1)}
                className="text-white px-2 py-1 rounded-full hover:bg-gray-700 s:px-0"
                disabled={page === totalPages}
              >
                →
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                className="text-white px-2 py-1 rounded-full hover:bg-gray-700 s:px-0"
                disabled={page === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default MovieList;
