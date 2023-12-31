import { createSlice } from "@reduxjs/toolkit";

const initialState =
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {
        items: [],
        totalCost: 0,
        totalItems: 0,
      };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
      state.totalCost += action.payload.price;
      state.totalItems++;
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalCost -= action.payload.price;
      state.totalItems--;
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeAllItems: (state) => {
        state = initialState,
        localStorage.setItem('cart', JSON.stringify(state))
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
