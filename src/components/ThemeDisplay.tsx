import { ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { Theme } from '@mui/system'

import { useThemeContext } from '../hooks/useThemeContext'

interface Props {
  children: ReactNode
}

const ThemeDisplay = ({ children }: Props) => {
  const { isDarkTheme } = useThemeContext()
  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: '#e8d37d',
      },
    },
  })

  return <ThemeProvider theme={theme as Theme}>{children}</ThemeProvider>
}

export default ThemeDisplay
