import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasketProps, ProductsProps } from "../../types";

const wishlistState = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems") || '[]')
  : [];

type wishlistState = {
  wishlist: BasketProps[];
};

const initialState = {
  wishlist: wishlistState,
} as wishlistState;

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ProductsProps>) => {
      const check = state.wishlist.some(item => item.id === action.payload.id)
      if (!check) {
        state.wishlist.push({ ...action.payload, count: 1 });
      }
      else {
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload)
    },
    clearWishlist: (state) => {
      state.wishlist = []
    }
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer;