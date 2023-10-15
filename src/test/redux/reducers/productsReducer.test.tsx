import { renderHook, waitFor } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { act } from 'react-dom/test-utils'

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useFetchAllProductsQuery,
  useFetchSingleProductQuery,
  useUpdateProductMutation,
} from '../../../redux/queries/productQueries'
import productServer from '../../../server/productServer'
import { ProductMutationOptions } from '../../../types/ProductMutationOptions'
import { productsData } from '../../productsData'
import productsReducer, {
  addFeaturedProduct,
  removeFeaturedProduct,
  sortProductsByPrice,
} from '../../../redux/reducers/productsReducer'
import { ProductsReducerState } from '../../../types/ProductsReducerState'
import Wrapper from '../../Wrapper'
import { Product } from '../../../types/Product'
import { createStore } from '../../../redux/store/store'

const wrapper = ({ children }: PropsWithChildren) => (
  <Wrapper>{children}</Wrapper>
)

// Enable API mocking before tests.
beforeAll(() => productServer.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => productServer.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => productServer.close())

describe('Test asynchronous actions of productsReducer', () => {
  test('Should fetch all products', async () => {
    const { result } = renderHook(
      () =>
        useFetchAllProductsQuery({
          title: '',
          offset: 0,
          limit: 3,
          category: '',
        }),
      { wrapper }
    )
    const { isLoading: isFetching } = result.current
    expect(isFetching).toBe(true)

    await waitFor(() => {
      const { data } = result.current

      expect(data?.length).toBe(3)
    })
  })

  test('Should fetch a single product', async () => {
    const { result } = renderHook(() => useFetchSingleProductQuery(9), {
      wrapper,
    })
    const { isLoading: isFetching } = result.current
    expect(isFetching).toBe(true)

    await waitFor(() => {
      const { data } = result.current

      expect(data).toMatchObject({
        id: 9,
        title: 'Bespoke Wooden Shirt',
        price: 551,
        description:
          'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        category: {
          id: 5,
          name: 'Others',
          image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
        },
        images: [
          'https://source.unsplash.com/random',
          'https://source.unsplash.com/random',
          'https://source.unsplash.com/random',
        ],
      })
    })
  })

  test('Should fail to fetch a non-existing product', async () => {
    const { result } = renderHook(() => useFetchSingleProductQuery(11), {
      wrapper,
    })
    const { isLoading: isFetching } = result.current
    expect(isFetching).toBe(true)

    await waitFor(() => {
      const { data } = result.current

      expect(data).toBe('Cannot fetch product')
    })
  })

  test('Should delete an existing product', async () => {
    const { result } = renderHook(() => useDeleteProductMutation(), {
      wrapper,
    })
    const [deleteProduct] = result.current

    await act(async () => {
      const res = await deleteProduct(9)

      expect(res).toMatchObject({ data: true })
    })
  })

  test('Should return false when deleting a non-existing product', async () => {
    const { result } = renderHook(() => useDeleteProductMutation(), {
      wrapper,
    })
    const [deleteProduct] = result.current

    await act(async () => {
      const res = await deleteProduct(11)

      expect(res).toMatchObject({ data: false })
    })
  })

  test('Should create a new product', async () => {
    const newProduct: ProductMutationOptions = {
      title: 'new product',
      price: 123,
      description: 'it is a new product',
      categoryId: 1,
      images: ['https://www.google.com'],
    }

    const { result } = renderHook(() => useCreateProductMutation(), {
      wrapper,
    })
    const [createProduct] = result.current

    await act(async () => {
      const res = await createProduct(newProduct)

      expect(res).toMatchObject({
        data: {
          id: 1,
          title: 'new product',
          price: 123,
          description: 'it is a new product',
          categoryId: 1,
          images: ['https://www.google.com'],
        },
      })
    })
  })

  test('Should update an existing product', async () => {
    const updatedProduct: ProductMutationOptions = {
      title: 'updated product',
      price: 123,
      description: 'it is a updated product',
      categoryId: 1,
      images: ['https://www.facebook.com'],
    }

    const { result } = renderHook(() => useUpdateProductMutation(), {
      wrapper,
    })
    const [updateProduct] = result.current

    await act(async () => {
      const res = await updateProduct({ id: 9, ...updatedProduct })

      expect(res).toMatchObject({
        data: {
          id: 9,
          title: 'updated product',
          price: 123,
          description: 'it is a updated product',
          category: {
            id: 5,
            name: 'Others',
            image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
          },
          images: ['https://www.facebook.com'],
          categoryId: 1,
        },
      })
    })
  })

  test('Should fail to update a non-existing product', async () => {
    const updatedProduct: ProductMutationOptions = {
      title: 'updated product',
      price: 123,
      description: 'it is a updated product',
      categoryId: 1,
      images: ['https://www.facebook.com'],
    }

    const { result } = renderHook(() => useUpdateProductMutation(), {
      wrapper,
    })
    const [updateProduct] = result.current

    await act(async () => {
      const res = await updateProduct({ id: 11, ...updatedProduct })

      expect(res).toMatchObject({ data: 'Cannot update non-existing product' })
    })
  })
})

describe('Test synchronous actions of productsReducer', () => {
  test('Should sort products by price desc', () => {
    const state: ProductsReducerState = {
      products: productsData,
      featuredProducts: [] as Product[],
      loading: false,
      error: '',
    }
    const products = productsReducer(
      state,
      sortProductsByPrice('desc')
    ).products

    expect(products[0]).toBe(productsData[0])
    expect(products[1]).toBe(productsData[2])
  })

  test('Should sort products by price asc', () => {
    const state: ProductsReducerState = {
      products: productsData,
      featuredProducts: [] as Product[],
      loading: false,
      error: '',
    }
    const products = productsReducer(state, sortProductsByPrice('asc')).products

    expect(products[0]).toBe(productsData[1])
    expect(products[1]).toBe(productsData[2])
  })

  test('Should set products to be featured and remove some of them', () => {
    const store = createStore()
    store.dispatch(addFeaturedProduct(productsData[0]))
    store.dispatch(addFeaturedProduct(productsData[0]))
    store.dispatch(addFeaturedProduct(productsData[1]))

    expect(store.getState().productsReducer.featuredProducts.length).toBe(3)

    store.dispatch(removeFeaturedProduct(9))

    expect(store.getState().productsReducer.featuredProducts.length).toBe(2)
  })
})
