import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetFilterItemsProps, InfoProps, ProductDetailProps, ProductsProps, RootProductsProps } from '../types';

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://gleaming-wasp-cuff-links.cyclic.app/" }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    products: builder.query<RootProductsProps, { category: string | undefined, q: string }>({
      query: ({ category, q }) => category + q,
      transformResponse(apiResponse: ProductsProps[], meta): RootProductsProps {
        return { apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
      }
    }),
    getFilterItems: builder.query<GetFilterItemsProps, { category: string }>({
      query: ({ category }) => category,
      transformResponse(apiResponse: ProductsProps[]): GetFilterItemsProps {
        let keys: Array<string> = []
        let filterItemsObj: { [key: string]: any } = {}

        apiResponse.map((product) => {
          keys = Object.keys(product.filterItems)
        })

        for (let i = 0; i < keys.length; i++) {
          filterItemsObj[keys[i]] = apiResponse.map((product) => product.filterItems[keys[i]])
        }

        const maxPrice = Math.max(...apiResponse.map(item => item.price))
        const minPrice = Math.min(...apiResponse.map(item => item.price))
        
        return {
          filterItems: Object.entries(filterItemsObj), maxPrice, minPrice
        }
      }
    }),
    product: builder.query<ProductDetailProps, { category: string | undefined, id: string }>({
      query: ({ category, id }) => `${category}?id=${id}`,
      transformResponse: (response: ProductsProps[]) => {
        return {
          ...response[0], monthlyPayment: {
            sixMonths: Number((response[0].price / 6).toFixed(2)),
            nineMonths: Number((response[0].price / 9).toFixed(2)),
            twelveMonths: Number((response[0].price / 12).toFixed(2))
          }
        }
      }
    }),
    info: builder.query<InfoProps, { category: string }>({
      query: ({ category }) => category,
    }),
  }),
})

export const {
  useProductsQuery,
  useProductQuery,
  useGetFilterItemsQuery,
  useInfoQuery
} = productsApi;