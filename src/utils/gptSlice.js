import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    suggestedMovies: null,
    movieResultNames: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addSuggestedMovies: (state, action) => {
      const { tmdbMovies, movieNames } = action.payload;
      state.suggestedMovies = tmdbMovies;
      state.movieResultNames = movieNames;
    },
  },
});

export default gptSlice.reducer;
export const { toggleGptSearchView, addSuggestedMovies } = gptSlice.actions;
