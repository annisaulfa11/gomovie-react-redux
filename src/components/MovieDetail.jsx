import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, fetchMovieVideos } from "../redux/movieDetailSlice";
import { useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, videos } = useSelector(
    (state) => state.movieDetail
  );

  const [selectedVideo, setSelectedVideo] = useState(0);

  function handleVideoClick(index) {
    setSelectedVideo(index);
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id));
      dispatch(fetchMovieVideos(id));
    }
  }, [dispatch, id]);

  if (!movieDetail || !videos || videos.length === 0) {
    return <div className="h-screen bg-black w-full"></div>;
  }
  const currentVideo = videos[selectedVideo];

  return (
    <div className="bg-black px-12 pt-20 pb-2 s:px-6">
      <div className="lg:flex justify-between s:flex-col">
        {currentVideo && (
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.key}`}
            title={currentVideo.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className=" lg:w-3/4 s:w-full s:h-64 sm:w-full sm:h-96 lg:h-100 "
          />
        )}

        <div className=" lg:w-1/3 max-h-100 s:my-5 sm:my-5 sm:px-0 s:px-0 s:w-full sm:w-full lg:px-4 lg:py-3 lg:my-0 text-white overflow-y-scroll">
          <h2 className="text-lg font-bold mb-3">Daftar Video</h2>
          <ul className="flex flex-col gap-y-4">
            {videos.map((video, index) => (
              <li
                key={video.id}
                className={`flex border rounded-md ${
                  selectedVideo === index
                    ? "border-blue-400"
                    : "border-blue-900"
                } px-2 py-2  hover:bg-gray-800 cursor-pointer`}
                onClick={() => handleVideoClick(index)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movieDetail.backdrop_path}`}
                  className={`w-32 rounded-md mr-3 ${
                    selectedVideo === index ? "opacity-50" : ""
                  }`}
                ></img>
                <div>
                  <h5 className="text-sm font-bold text-blue-600">
                    {video.type}
                  </h5>
                  <h4 className="text-sm">{video.name}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-white my-5 py-5 bg-slate-900 px-5 s:flex-col lg:flex">
        <img
          src={`https://image.tmdb.org/t/p/w200${movieDetail.poster_path}`}
          className="s:w-28 sm:w-36 lg:w-fit"
        ></img>
        <div className="lg:ml-10 lg:text-lg s:ml-0 s:mt-4 s:text-sm sm:ml-0 sm:mt-4 flex  flex-col gap-y-3">
          <h1 className=" text-3xl font-bold s:text-sm mb-5 s:mb-1 ">{movieDetail.title}</h1>
          <p>{movieDetail.overview}</p>
          <p>Release Date: {movieDetail.release_date}</p>
          <p>Rating: {movieDetail.vote_average}</p>
          <p>Genre: </p>
          <div className="flex-wrap flex gap-x-3 gap-y-3">
            {movieDetail.genres.map((genre) => (
              <p key={genre.id} className=" py-1 px-3 rounded-md bg-slate-600">
                {genre.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
