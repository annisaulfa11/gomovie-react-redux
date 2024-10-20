import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchMoviesByGenre } from "../redux/genreMovieSlice";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Popular() {
  const dispatch = useDispatch();
  const { genres, moviesByGenre, status } = useSelector(
    (state) => state.genreMovie
  );
  const sliderRef = useRef();

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genres.length > 0) {
      genres.forEach((genre) => {
        dispatch(fetchMoviesByGenre({id: genre.id}));
      });
    }
  }, [genres, dispatch]);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const isAtStart = slider.scrollLeft === 0;
    const isAtEnd =
      slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10;

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

  return (
    <>
      <div className="  px-20 py-10 overflow-y-hidden s:px-6 ">
        <section>
          <div>
            <h3 className="text-3xl font-bold mb-5 text-white s:text-2xl">
              Our Genres
            </h3>
            {showLeftButton && (
              <div className="relative  z-30">
                <button
                  onClick={scrollLeft}
                  className=" absolute s:top-24 top-24 -left-6 bg-slate-800 py-3 px-5 rounded-full text-white"
                >
                  &#10094;
                </button>
              </div>
            )}
            {showRightButton && (
              <div className="relative z-30">
                <button
                  onClick={scrollRight}
                  className="s:top-24 absolute -right-6 top-24 bg-slate-800 py-3 px-5 rounded-full text-white"
                >
                  &#10095;
                </button>
              </div>
            )}

            <div
              ref={sliderRef}
              className="flex p-1 gap-x-6 scroll-smooth whitespace-nowrap overflow-x-scroll scrollbar-hide"
            >
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/gomovie-react-redux/genre/${genre.id}`}
                    className="outline outline-black-200 outline-1 bg-black-600 p-5 rounded-md"
                  >
                    <div className="relative flex flex-wrap w-44  justify-center gap-2">
                      {moviesByGenre[genre.id]?.movies.map((movie) => (
                        <>
                          <img
                            key={movie.id}
                            className="rounded-md max-w-none w-20 h-20 object-cover"
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                          ></img>
                          <div className="absolute  h-44 w-full linear-gradient"></div>
                        </>
                      ))}
                    </div>
                    <p className="text-white mt-2 pl-1">{genre.name}</p>
                  </Link>
                ))
              ) : (
                <p></p>
              )}
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

// Usage Example (within a React component):

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchGenres, fetchMoviesByGenre } from "./path-to-slice";

// function MovieComponent() {
//   const dispatch = useDispatch();
//   const { genres, moviesByGenre, status } = useSelector((state) => state.genreMovie);

//   useEffect(() => {
//     dispatch(fetchGenres());
//   }, [dispatch]);

//   useEffect(() => {
//     if (genres.length > 0) {
//       genres.forEach((genre) => {
//         dispatch(fetchMoviesByGenre(genre.id));
//       });
//     }
//   }, [genres, dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Failed to fetch data.</p>;

//   return (
//     <div>
//       {genres.map((genre) => (
//         <div key={genre.id}>
//           <h3>{genre.name}</h3>
//           <div>
//             {moviesByGenre[genre.id]?.map((movie) => (
//               <p key={movie.id}>{movie.title}</p>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
