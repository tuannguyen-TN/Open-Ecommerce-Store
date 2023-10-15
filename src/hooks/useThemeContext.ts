import { useContext } from 'react'

import { ThemeContext } from '../contexts/ThemeContext'

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('themeContext must be inside a ThemeContext.Provider')
  }
  return themeContext
}
