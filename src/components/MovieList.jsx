import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function MovieList() {
  const { movies, status } = useSelector((state) => state.movies);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to fetch movies</p>;
  }

  return (
    <>
    <h2 className='text-white bg-black px-12 pt-20 text-2xl font-bold s:text-sm s:px-5 s:pt-12'>Results</h2>
    <div className="flex gap-x-6 s:gap-x-5 flex-wrap px-10 s:px-3 overflow-hidden  bg-black justify-center min-h-screen">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card ">
            <p>{movie.release_date}</p>
            <Link
              key={movie.id}
              to={`/gomovie-react-redux/movie/${movie.id}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md max-w-none s:w-28"
              />
              </Link>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
    </>

  );
}

export default MovieList;
