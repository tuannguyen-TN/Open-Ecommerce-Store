import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ProductMutationOptions } from './../../types/ProductMutationOptions'
import { Product } from '../../types/Product'
import { FilterProductsOptions } from '../../types/FilterProductsOptions'

const productQueries = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/products',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], FilterProductsOptions>({
      query: (options: FilterProductsOptions) =>
        `?title=${options.title}&offset=${options.offset}&limit=${
          options.limit
        }${
          options.category.split(' ')[0].length > 0
            ? `&categoryId=${options.category.split(' ')[0]}`
            : ''
        }`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    fetchSingleProduct: builder.query<Product, number>({
      query: (productId) => `${productId}`,
    }),
    deleteProduct: builder.mutation<boolean, number>({
      query: (productId) => ({ url: `${productId}`, method: 'DELETE' }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<
      Product,
      Pick<Product, 'id'> & ProductMutationOptions
    >({
      query: ({ id, ...newValues }) => ({
        url: `${id}`,
        method: 'PUT',
        body: newValues,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productQueries.util.updateQueryData(
            'fetchSingleProduct',
            id,
            (draft: Product) => {
              Object.assign(draft, patch)
            }
          )
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    createProduct: builder.mutation<Product, ProductMutationOptions>({
      query: (newProduct) => ({
        url: '',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const {
  useFetchAllProductsQuery,
  useFetchSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productQueries
export default productQueries
