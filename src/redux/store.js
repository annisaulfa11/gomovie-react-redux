// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import searchMovieSlice from "./searchMovieSlice";
import nowPlayingSlice from "./nowPlayingSlice";
import popularMovieSlice from "./popularMovieSlice";
import topRatedMovieSlice from "./topRatedMovieSlice";
import movieDetailSlice from "./movieDetailSlice";
import genreMovieSlice from "./genreMovieSlice";

const store = configureStore({
  reducer: {
    movies: searchMovieSlice,
    nowPlaying: nowPlayingSlice,
    popularMovie: popularMovieSlice,
    topRatedMovie: topRatedMovieSlice,
    movieDetail: movieDetailSlice,
    genreMovie: genreMovieSlice
  },
});

export default store;
