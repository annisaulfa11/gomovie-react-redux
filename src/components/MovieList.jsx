import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MovieList() {
  const { movies, status } = useSelector((state) => state.movies);

  return (
    <>
      <h2 className="text-white  px-20 pt-28 text-2xl font-bold s:text-sm s:px-5 s:pt-20">
        Results
      </h2>
      {status === "loading" ? (
        <div className="flex justify-center items-center w-full p-28">
          <div className="border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex gap-6 s:gap-2  flex-wrap justify-between px-20 py-10 s:px-3 overflow-hidden  min-h-screen">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card ">
              <Link
                key={movie.id}
                to={`/gomovie-react-redux/movie/${movie.id}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md max-w-none s:w-24 min-w-full"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MovieList;
