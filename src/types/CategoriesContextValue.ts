import { Dispatch, SetStateAction } from 'react'
import { Category } from './Category'

export interface CategoriesContextValue {
  categories: Category[]
  setCategories: Dispatch<SetStateAction<Category[]>>
}
