import { createSlice } from "@reduxjs/toolkit";

const initialState =
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {
        items: {},
        totalCost: 0,
        totalItems: 0,
      };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, ...rest } = action.payload;
      const item = { ...rest, count: 1 };
      const existingItem = state.items[id];
      const count = existingItem ? existingItem.count + 1 : 1;
      state.items = { ...state.items, [id]: { ...item, count } };
      state.totalCost += item.price
      state.totalItems++
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeItem: (state, action) => {
      const { id, count, ...rest } = action.payload;
      if (count > 1) {
        state.items = { ...state.items, [id]: { ...rest, count: count - 1 } };
      } else {
        const newItems = {...state.items};
        newItems.delete(id)
        state.items = newItems;
      }
      state.totalCost -= action.payload.price
      state.totalItems--
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
