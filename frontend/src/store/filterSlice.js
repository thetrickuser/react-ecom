import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filters: {
    category: "All",
    minPrice: "",
    maxPrice: "",
    rating: "",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    categoryChanged: (state, action) => {
      state.filters.category = action.payload;
    },
    minPriceChanged: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    maxPriceChanged: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
    ratingChanged: (state, action) => {
      state.filters.rating = action.payload;
    },
    filteredProductsChanged: (state, action) => {
        state.filteredProducts = action.payload 
    }
  },
});

export default filterSlice.reducer;
export const filterActions = filterSlice.actions