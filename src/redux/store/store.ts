import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import productsReducer, {
  initialProductsState,
} from '../reducers/productsReducer'
import productQueries from '../queries/productQueries'
import cartReducer from '../reducers/cartReducer'
import { CartItem } from '../../types/CartItem'
import userReducer, { initialUserState } from '../reducers/userReducer'
import { UserReducerState } from '../../types/UserReducerState'
import { Product } from '../../types/Product'

const preLoadedCartReducer: CartItem[] = JSON.parse(
  localStorage.getItem('cart') || '[]'
)

const getAvailableFeaturedProducts = JSON.parse(
  (localStorage.getItem('featuredProducts') as string) || JSON.stringify([])
)

const preLoadedFeaturedProducts: Product[] =
  getAvailableFeaturedProducts.length > 0
    ? getAvailableFeaturedProducts
    : JSON.parse(JSON.stringify(initialProductsState.featuredProducts))

const preLoadedUserReducer: UserReducerState = JSON.parse(
  localStorage.getItem('user') || JSON.stringify(initialUserState)
)

export const createStore = () =>
  configureStore({
    reducer: {
      productsReducer,
      cartReducer,
      userReducer,
      [productQueries.reducerPath]: productQueries.reducer,
    },
    preloadedState: {
      cartReducer: preLoadedCartReducer,
      productsReducer: {
        ...initialProductsState,
        featuredProducts: preLoadedFeaturedProducts,
      },
      userReducer: preLoadedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productQueries.middleware),
  })

const store = createStore()

const updateLocalStorage = () => {
  const cart = store.getState().cartReducer
  const featuredProducts = store.getState().productsReducer.featuredProducts
  const userCredentials = store.getState().userReducer

  localStorage.setItem('cart', JSON.stringify(cart))
  localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts))
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...userCredentials,
      user: {
        email: userCredentials.user?.email,
        name: userCredentials.user?.name,
        role: userCredentials.user?.role,
        avatar: userCredentials.user?.avatar,
      },
    })
  )
}

store.subscribe(updateLocalStorage)
setupListeners(store.dispatch)

export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
