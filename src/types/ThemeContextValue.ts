import { Dispatch, SetStateAction } from 'react'

export interface ThemeContextValue {
  isDarkTheme: boolean
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}
