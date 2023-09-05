import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './productApi'
import cartReducer from './features/cartSlice'


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;