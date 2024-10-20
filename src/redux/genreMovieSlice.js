import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6e35b89039d0ed9d1aff0cc567db0822";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchGenres = createAsyncThunk(
  "genreMovie/fetchGenres",
  async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "genreMovie/fetchMoviesByGenre",
  async ({id, page = 1}) => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: id,
        sort_by: "vote_count.desc",
        page: page, 
      },
    });
    return { genreId: id, movies: response.data.results.slice(0, 4), allMovies: response.data.results, totalPages: response.data.total_pages};
  }
);


const genreMovieSlice = createSlice({
  name: "genreMovie",
  initialState: {
    genres: [],
    moviesByGenre: {},
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.status = "success";
      })
      .addCase(fetchGenres.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        const { genreId, movies, allMovies, totalPages} = action.payload;
        state.moviesByGenre[genreId] = {
          movies: movies,  
          all: allMovies,
          totalPages: totalPages,  
        };
        state.status = "success";
      })
      .addCase(fetchMoviesByGenre.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default genreMovieSlice.reducer;

