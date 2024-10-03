import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovie } from "../redux/popularMovieSlice";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Popular() {
  const dispatch = useDispatch();
  const { popularMovie, status } = useSelector((state) => state.popularMovie);
  const sliderRef = useRef();

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    dispatch(fetchPopularMovie());
  }, [dispatch]);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const isAtStart = slider.scrollLeft === 0;
    const isAtEnd = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10;
  
    setShowLeftButton(!isAtStart); // Show left button if not at start
    setShowRightButton(!isAtEnd); 
    if (!isAtStart) {
      setTimeout(() => {
        checkScrollPosition();
      }, 5);
    }
    if (!isAtEnd) {
      setTimeout(() => {
        checkScrollPosition();
      }, 5);
    }
  };

  const scrollLeft = () => {
    const slider = sliderRef.current;
    slider.scrollLeft -= slider.offsetWidth;
    setTimeout(() => {
      checkScrollPosition();
    }, 50);
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    slider.scrollLeft += slider.offsetWidth;
    setTimeout(() => {
      checkScrollPosition();
    }, 50);
    
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScrollPosition);
      }
    };
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to fetch movies</p>;
  }

  return (
    <>
      <div className=" bg-black px-12 py-7 overflow-y-hidden s:px-6 s:py-3">
        <section>
          <div>
            <h3 className="text-3xl font-bold mb-5 text-white s:text-sm">
              Popular Movies
            </h3>
            {showLeftButton && (
              <div className="relative  ">
                <button
                  onClick={scrollLeft}
                  className=" absolute s:top-14 top-32 -left-6 bg-slate-800 py-3 px-5 rounded-full text-white"
                >
                  &#10094;
                </button>
              </div>
            )}

            <div
              ref={sliderRef}
              className="flex gap-x-6 scroll-smooth whitespace-nowrap overflow-x-scroll scrollbar-hide"
            >
              {popularMovie.length > 0 ? (
                popularMovie.map((movie) => (
                  <Link key={movie.id} to={`/gomovie-react-redux/movie/${movie.id}`}>
                    <img
                      className="rounded-md max-w-none s:w-28"
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    ></img>
                  </Link>
                ))
              ) : (
                <p></p>
              )}
            </div>
            {showRightButton && (
              <div className="relative">
                <button
                  onClick={scrollRight}
                  className="s:-top-28 absolute -right-6 -top-44 bg-slate-800 py-3 px-5 rounded-full text-white"
                >
                  &#10095;
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
