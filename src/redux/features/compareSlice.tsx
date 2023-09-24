import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasketProps, ProductsProps } from "../../types";

const compareState = localStorage.getItem("compareItems")
  ? JSON.parse(localStorage.getItem("compareItems") || '[]')
  : [];

type compareState = {
  compare: BasketProps[];
};

const initialState = {
  compare: compareState,
} as compareState;

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<ProductsProps>) => {
      const check = state.compare.some(item => item.id === action.payload.id)
      if (!check) {
        state.compare.push({ ...action.payload, wish_list: true, count: 1 });
      }
      else {
        state.compare = state.compare.filter((item) => item.id !== action.payload.id)
      }
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.compare = state.compare.filter((item) => item.id !== action.payload)
    },
    clearCompare: (state) => {
      state.compare = []
    }
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions

export default compareSlice.reducer;