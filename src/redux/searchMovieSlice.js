// src/redux/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '6e35b89039d0ed9d1aff0cc567db0822'; 
const BASE_URL = 'https://api.themoviedb.org/3';

// Thunk untuk fetch data dari API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query
    }
  });
  return response.data.results;
});

// Slice untuk movie
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'success';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
