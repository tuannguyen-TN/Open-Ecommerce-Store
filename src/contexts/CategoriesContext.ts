import { createContext } from 'react'

import { Category } from '../types/Category'

export const CategoriesContext = createContext<Category[] | null>(null)
