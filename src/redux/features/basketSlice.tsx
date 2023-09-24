import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasketProps, ProductsProps } from "../../types";

const basketState = localStorage.getItem("basketItems")
  ? JSON.parse(localStorage.getItem("basketItems") || '[]')
  : [];

type basketState = {
  basket: BasketProps[];
};

const initialState = {
  basket: basketState,
} as basketState;

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ProductsProps>) => {
      const check = state.basket.some(item => item.id === action.payload.id)
      if (!check) {
        state.basket.push({ ...action.payload, count: 1 });
      }
      else {
        state.basket = state.basket.map(item => item.id === action.payload.id ?
          { ...item, count: item.count + 1 } : item)
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.map(item => item.id === action.payload ?
        { ...item, count: item.count + 1 } : item)
    },
    decrease: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.map(item => item.id === action.payload ? { ...item, count: item.count - 1 } : item)
        .filter(item => item.count !== 0)
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.filter((item) => item.id !== action.payload)
    },
    clearBaket: (state) => {
      state.basket = []
    }
  },
});

export const { addToBasket, increase, decrease, removeFromBasket, clearBaket } = basketSlice.actions

export default basketSlice.reducer;