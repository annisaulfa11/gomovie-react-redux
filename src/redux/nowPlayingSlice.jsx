import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6e35b89039d0ed9d1aff0cc567db0822";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchNowPlaying = createAsyncThunk(
  "nowPlaying/fetchNowPlaying",
  async () => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  }
);

const nowPlayingSlice = createSlice({
  name: "nowPlaying",
  initialState: {
    nowPlaying: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlaying.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
        state.status = "success";
      })
      .addCase(fetchNowPlaying.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default nowPlayingSlice.reducer;
