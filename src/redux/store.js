// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import searchMovieReducer from "./searchMovieSlice";
import nowPlayingReducer from "./nowPlayingSlice";
import popularMovieSlice from "./popularMovieSlice";
import topRatedMovieSlice from "./topRatedMovieSlice";
import movieDetailSlice from "./movieDetailSlice";

const store = configureStore({
  reducer: {
    movies: searchMovieReducer,
    nowPlaying: nowPlayingReducer,
    popularMovie: popularMovieSlice,
    topRatedMovie: topRatedMovieSlice,
    movieDetail: movieDetailSlice,
  },
});

export default store;
