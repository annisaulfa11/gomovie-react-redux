// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import searchMovieReducer from "./searchMovieSlice";
import nowPlayingReducer from "./nowPlayingSlice";
import popularMovieSlice from "./popularMovieSlice";
import topRatedMovieSlice from "./topRatedMovieSlice";

const store = configureStore({
  reducer: {
    movies: searchMovieReducer,
    nowPlaying: nowPlayingReducer,
    popularMovie: popularMovieSlice,
    topRatedMovie: topRatedMovieSlice,
  },
});

export default store;
