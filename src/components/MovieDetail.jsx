import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, fetchMovieVideos } from "../redux/movieDetailSlice";
import { useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, videos, status } = useSelector(
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load movie details</div>;
  }

  if (!movieDetail) {
    return <div>No movie details available</div>;
  }

  const currentVideo = videos[selectedVideo];

  return (
    <div className="bg-black px-12 pt-20 pb-2">
      <div className="flex justify-between">
        {currentVideo && (
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.key}`}
            title={currentVideo.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-3/4 mr-10"
          />
        )}

        <div className=" w-1/3 h-100 px-4 py-3 text-white overflow-y-scroll">
          <h2 className="text-lg font-bold mb-3">Daftar Video</h2>
          <ul className="flex flex-col gap-y-4 ">
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
      <div className="text-white my-5 py-5 flex bg-slate-900 px-5 ">
        <img
          src={`https://image.tmdb.org/t/p/w200${movieDetail.poster_path}`}
        ></img>
        <div className="ml-10 text-lg flex  flex-col gap-y-3">
          <h1 className=" text-3xl font-bold mb-5">{movieDetail.title}</h1>
          <p>{movieDetail.overview}</p>
          <p>Release Date: {movieDetail.release_date}</p>
          <p>Rating: {movieDetail.vote_average}</p>
          <p>Genre: </p>
          <div className="flex gap-x-3">
            {movieDetail.genres.map((genre) => (
              <p key={genre.id} className="py-1 px-3 rounded-md bg-slate-600">{genre.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
