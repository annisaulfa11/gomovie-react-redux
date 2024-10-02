import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6e35b89039d0ed9d1aff0cc567db0822";
const BASE_URL = "https://api.themoviedb.org/3";

// Thunk for fetching movie detail by ID
export const fetchMovieDetail = createAsyncThunk(
  "movieDetail/fetchMovieDetail",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  }
);

// Thunk for fetching videos related to a movie by ID
export const fetchMovieVideos = createAsyncThunk(
  "movieDetail/fetchMovieVideos",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;  // Return the array of videos
  }
);

// Movie detail slice
const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    movieDetail: null,
    videos: [],  // Add a field for videos
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.status = "success";
      })
      .addCase(fetchMovieDetail.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMovieVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.videos = action.payload;  // Set the videos
        state.status = "success";
      })
      .addCase(fetchMovieVideos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default movieDetailSlice.reducer;
