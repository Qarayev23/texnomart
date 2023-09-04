import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductsProps } from '../types';

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://texnomart-db-c49524c88c8a.herokuapp.com/" }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        products: builder.query<ProductsProps[], void>({
            query: () => 'products',
        }),
        product: builder.query<ProductsProps, string>({
            query: (id) => `products/${id}`,
        }),
        productBySearch: builder.query<ProductsProps[], string>({
            query: (q) => `products?q=${q}`,
        }),
    }),
})

export const {
    useProductsQuery,
    useProductQuery,
    useProductBySearchQuery
} = productsApi;