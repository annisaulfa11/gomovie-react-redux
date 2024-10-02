import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlaying } from "../redux/nowPlayingSlice";
import { Link } from "react-router-dom";

export default function HomeBanner() {
  const dispatch = useDispatch();
  const { nowPlaying, status } = useSelector((state) => state.nowPlaying);

  // Local state to keep track of the current movie index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchNowPlaying());
  }, [dispatch]);

  function handleDotClick(index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === nowPlaying.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [nowPlaying]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to fetch movies</p>;
  }

  if (nowPlaying.length === 0) {
    return <p></p>;
  }

  const currentMovie = nowPlaying[currentIndex];

  return (
    <>
      <div className="relative movie-banner ">
        <div className="movie-card h-128 relative overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt={currentMovie.original_title}
            className="w-full h-128 absolute transition-opacity duration-1000 ease-in-out opacity-50"
            key={currentMovie.backdrop_path}
            onLoad={(e) => (e.target.style.opacity = 1)}
          />
          <div className="relative flex flex-col radial-gradient h-fit mx-28 justify-center my-32 w-1/2 p-8 text-white z-20 transition-opacity duration-700 ease-in-out">
            <h2 className="text-3xl font-bold mb-5 transition-transform duration-1000 transform ease-in-out">
              {currentMovie.original_title}
            </h2>
            <p className="font-semibold text-pretty transition-opacity duration-1000 ease-in-out">
              {currentMovie.overview}
            </p>
            <Link
              key={currentMovie.id}
              to={`/gomovie-react-redux/movie/${currentMovie.id}`}
            >
              <button className=" bg-blue-600 px-5 py-2 w-fit mt-5 rounded-md font-bold">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-5 px-36 z-0 flex justify-start space-x-3">
          {nowPlaying.map((movie, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
