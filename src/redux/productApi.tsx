import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductDetailProps, ProductsProps, RootProductsProps } from '../types';

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://texnomart-db-c49524c88c8a.herokuapp.com/" }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        products: builder.query<RootProductsProps, string>({
            query: (q) => {
                q.includes("&brand=all") && (q = q.replace("&brand=all", ""))
                q.includes("&memory=all") && (q = q.replace("&memory=all", ""))
                q.includes("&ram=all") && (q = q.replace("&ram=all", ""))
                return `products${q}`
            },
            transformResponse(apiResponse: ProductsProps[], meta): RootProductsProps {
                return { apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
            }
        }),
        product: builder.query<ProductDetailProps, string>({
            query: (id) => `products/${id}`,
            transformResponse: (response: ProductsProps) => {
                return {
                    ...response, monthlyPayment: {
                        sixMonths: Number((response.price / 6).toFixed(2)),
                        nineMonths: Number((response.price / 9).toFixed(2)),
                        twelveMonths: Number((response.price / 12).toFixed(2))
                    }
                }
            }
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