import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Box, Container, CssBaseline, Typography } from '@mui/material'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import ErrorPage from './pages/ErrorPage'
import AllProductsPage from './pages/AllProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import { ThemeContext } from './contexts/ThemeContext'
import ThemeDisplay from './components/ThemeDisplay'
import Footer from './components/Footer'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <ThemeDisplay>
          <CssBaseline />
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 4,
            }}
          >
            <Container maxWidth="md">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Open E-commerce Store
                </Typography>
              </Link>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                A portal to look for the favorite product of your choice, from
                clothing, accessories, to electronics, or even cars!
              </Typography>
            </Container>
          </Box>

          <main style={{ minHeight: 'calc(100vh - 290px)' }}>
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<AllProductsPage />} />
                <Route path="/products">
                  <Route path=":id" element={<SingleProductPage />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Container>
          </main>

          <footer style={{ backgroundColor: 'gray' }}>
            <Footer />
          </footer>
        </ThemeDisplay>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
