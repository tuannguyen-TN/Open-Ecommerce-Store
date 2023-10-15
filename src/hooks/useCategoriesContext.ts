import { useContext } from 'react'

import { CategoriesContext } from '../contexts/CategoriesContext'

export const useCategoriesContext = () => {
  const categoriesContext = useContext(CategoriesContext)
  if (!categoriesContext) {
    throw new Error(
      'categoriesContext must be inside a CategoriesContext.Provider'
    )
  }
  return categoriesContext
}
