import { Product } from './Product'

export interface ProductsReducerState {
  products: Product[]
  featuredProducts: Product[]
  loading: boolean
  error: string
}
