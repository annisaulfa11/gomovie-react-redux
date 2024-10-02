import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6e35b89039d0ed9d1aff0cc567db0822";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTopRatedMovie = createAsyncThunk(
    "topRatedMovie/fetchTopRatedMovie", 
    async () => {
        const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data.results;
    }
);

const topRatedMovieSlice = createSlice({
    name: "topRatedMovie",
    initialState: {
        topRatedMovie: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopRatedMovie.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTopRatedMovie.fulfilled, (state, action) => {
                state.topRatedMovie = action.payload;
                state.status = "success";
            })
            .addCase(fetchTopRatedMovie.rejected, (state) => {
                state.status = "failed"
            })
    }
});

export default topRatedMovieSlice.reducer;