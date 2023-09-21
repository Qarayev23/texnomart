import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductDetailProps, ProductsProps, RootProductsProps } from '../types';

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://texnomart-db-c49524c88c8a.herokuapp.com/" }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    products: builder.query<RootProductsProps, { category: string | undefined, q: string }>({
      query: ({ category, q }) => category + q,
      transformResponse(apiResponse: ProductsProps[], meta): RootProductsProps {
        let keys: Array<string> = []
        let filterItemsObj: { [key: string]: any } = {}

        apiResponse.map((product) => {
          keys = Object.keys(product.filterItems)
        })

        for (let i = 0; i < keys.length; i++) {
          filterItemsObj[keys[i]] = apiResponse.map((product) => product.filterItems[keys[i]])
        }

        return { apiResponse, filterItems: Object.entries(filterItemsObj), totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
      }
    }),
    product: builder.query<ProductDetailProps, { category: string | undefined, id: string }>({
      query: ({ category, id }) => `${category}/${id}`,
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
  }),
})

export const {
  useProductsQuery,
  useProductQuery,
} = productsApi;