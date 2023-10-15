import { createContext } from 'react'

import { ThemeContextValue } from '../types/ThemeContextValue'

export const ThemeContext = createContext<ThemeContextValue | null>(null)
