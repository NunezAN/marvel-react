import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  herodata: [],
  searchInput: "",
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setHeroData: (state, action) => {
      state.heroData = action.payload;
    },
    removeHeroData: (state) => {
      state.heroData = [];
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    removeSearchInput: (state) => {
      state.searchInput = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoading,
  stopLoading,
  setHeroData,
  removeHeroData,
  removeSearchInput,
  setSearchInput,
} = heroSlice.actions;

export const selectLoading = (state) => state.hero.loading;
export const selectHeroData = (state) => state.hero.heroData;
export const selectSearchInput = (state) => state.hero.searchInput;

export default heroSlice.reducer;
