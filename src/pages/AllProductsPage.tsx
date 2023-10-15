import {
  Box,
  Pagination,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import { Product } from '../types/Product'
import {
  useCreateProductMutation,
  useFetchAllProductsQuery,
} from '../redux/queries/productQueries'
import { Category } from '../types/Category'
import ProductListDisplay from '../components/ProductListDisplay'
import CategoryMenu from '../components/CategoryMenu'
import ProductMutationFormDialog from '../components/ProductMutationFormDialog'
import productsReducer, {
  sortProductsByPrice,
} from '../redux/reducers/productsReducer'
import { ProductsReducerState } from '../types/ProductsReducerState'
import { FilterProductsOptions } from '../types/FilterProductsOptions'
import ItemPerPageMenu from '../components/ItemPerPageMenu'
import SortingOptionsMenu from '../components/SortingOptionsMenu'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { CategoriesContext } from '../contexts/CategoriesContext'

const AllProductsPage = () => {
  const [fetchOptions, setFetchOptions] = useState<FilterProductsOptions>({
    title: '',
    offset: 0,
    limit: 6,
    category: '',
  })
  const [page, setPage] = useState<number>(1)
  const [totalProductsNum, setTotalProductsNum] = useState<number>(0)
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [sortOption, setSortOption] = useState<string>('')
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const { user } = useAppSelector((state: StateType) => state.userReducer)
  const totalPageCount = useMemo(() => {
    return fetchOptions.limit > 0
      ? Math.floor(totalProductsNum / fetchOptions.limit) +
          Math.ceil(
            (totalProductsNum -
              fetchOptions.limit *
                Math.floor(totalProductsNum / fetchOptions.limit)) /
              fetchOptions.limit
          )
      : 1
  }, [fetchOptions.limit, totalProductsNum])

  const state: ProductsReducerState = {
    products: [] as Product[],
    featuredProducts: [] as Product[],
    loading: false,
    error: '',
  }

  const {
    data: filteredProducts,
    isLoading,
    error,
  } = useFetchAllProductsQuery(fetchOptions, {
    selectFromResult: ({ data, isLoading, error }) => ({
      data: sortOption
        ? productsReducer(
            {
              ...state,
              products: data as Product[],
            },
            sortProductsByPrice(sortOption as 'asc' | 'desc')
          ).products
        : data,
      isLoading,
      error,
    }),
  })

  const fetchAllProducts = useCallback(async () => {
    const res = await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products?title=${fetchOptions.title}${
        fetchOptions.category
          ? fetchOptions.category.split(' ')[0].length > 0
            ? `&categoryId=${fetchOptions.category.split(' ')[0]}`
            : ''
          : ''
      }`
    )
    setTotalProductsNum(res.data.length)
  }, [fetchOptions.title, fetchOptions.category])

  const fetchAllCategories = async () => {
    const res = await axios.get<Category[]>(
      'https://api.escuelajs.co/api/v1/categories'
    )
    setAllCategories(res.data)
  }

  useEffect(() => {
    fetchAllCategories()
    setLoadingCategories(false)
  }, [])

  useEffect(() => {
    setFetchOptions({
      ...fetchOptions,
      offset: (page - 1) * fetchOptions.limit,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  return (
    <>
      {loadingCategories ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <CategoriesContext.Provider value={allCategories}>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Stack
                direction="row"
                alignItems="baseline"
                spacing={2}
                sx={{ pb: 4 }}
              >
                <TextField
                  label="Product title"
                  variant="standard"
                  onChange={(e) => {
                    setPage(1)
                    setFetchOptions({ ...fetchOptions, title: e.target.value })
                  }}
                />
                <CategoryMenu
                  value={fetchOptions.category}
                  onChange={(e: SelectChangeEvent) => {
                    setPage(1)
                    setFetchOptions({
                      ...fetchOptions,
                      category: e.target.value,
                    })
                  }}
                />
                <SortingOptionsMenu
                  trends={['Ascending', 'Descending']}
                  value={sortOption}
                  onChange={(e: SelectChangeEvent) => {
                    setPage(1)
                    setSortOption(e.target.value)
                  }}
                />
                <ItemPerPageMenu
                  quantities={[6, 15, 30, 45]}
                  value={fetchOptions.limit.toString()}
                  onChange={(e: SelectChangeEvent) => {
                    setPage(1)
                    setFetchOptions({
                      ...fetchOptions,
                      limit: Number(e.target.value),
                    })
                  }}
                />
              </Stack>
              <ProductMutationFormDialog
                product={{} as unknown as Product}
                disabled={user === null || user.role !== 'admin' || isCreating}
                action="Create"
                onSubmit={createProduct}
              />
            </Stack>
            {isLoading && (
              <Skeleton variant="rectangular" width="100%" height={400} />
            )}
            {error && <Typography variant="h4">Items not found.</Typography>}
            {filteredProducts && (
              <ProductListDisplay products={filteredProducts} />
            )}
            <Stack direction="column" alignItems="center" sx={{ mt: 3 }}>
              <Pagination
                count={totalPageCount}
                size="large"
                showFirstButton
                showLastButton
                page={page}
                onChange={(e: React.ChangeEvent<unknown>, value: number) =>
                  setPage(value)
                }
              />
            </Stack>
          </Box>
        </CategoriesContext.Provider>
      )}
    </>
  )
}

export default AllProductsPage
