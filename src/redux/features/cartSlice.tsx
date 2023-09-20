import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProps, ProductsProps } from "../../types";

const cartState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") || '[]')
  : [];

type basketState = {
  cart: CartProps[];
};

const initialState = {
  cart: cartState,
} as basketState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductsProps>) => {
      const check = state.cart.some(item => item.id === action.payload.id)
      if (!check) {
        state.cart.push({ ...action.payload, count: 1 });
      }
      else {
        state.cart = state.cart.map(item => item.id === action.payload.id ?
          { ...item, count: item.count + 1 } : item)
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.map(item => item.id === action.payload ?
        { ...item, count: item.count + 1 } : item)
    },
    decrease: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.map(item => item.id === action.payload ? { ...item, count: item.count - 1 } : item)
        .filter(item => item.count !== 0)
    },
    remove: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    clearBaket: (state) => {
      state.cart = []
    }
  },
});

export const { addToCart, increase, decrease, remove, clearBaket } = cartSlice.actions

export default cartSlice.reducer;