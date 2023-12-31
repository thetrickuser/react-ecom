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
    changeCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    changeMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    changeMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
    changeRating: (state, action) => {
      state.filters.rating = action.payload;
    },
    modifyFilteredProducts: (state, action) => {
        state.filteredProducts = action.payload 
    }
  },
});

export default filterSlice.reducer;
export const filterActions = filterSlice.actions