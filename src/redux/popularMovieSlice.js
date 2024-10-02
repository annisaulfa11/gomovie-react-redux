import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6e35b89039d0ed9d1aff0cc567db0822";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovie = createAsyncThunk(
    "popularMovie/fetchPopularMovie", 
    async () => {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data.results;
    }
);

const popularMovieSlice = createSlice({
    name: "popularMovie",
    initialState: {
        popularMovie: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovie.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPopularMovie.fulfilled, (state, action) => {
                state.popularMovie = action.payload;
                state.status = "success";
            })
            .addCase(fetchPopularMovie.rejected, (state) => {
                state.status = "failed"
            })
    }
});

export default popularMovieSlice.reducer;