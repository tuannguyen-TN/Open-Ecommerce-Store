import {
  AppBar,
  Avatar,
  Badge,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import MaterialUISwitch from './MaterialUISwitch'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { userLogout } from '../redux/reducers/userReducer'
import { useThemeContext } from '../hooks/useThemeContext'

const Navbar = () => {
  const cart = useAppSelector((state: StateType) => state.cartReducer)
  const totalCartItems = cart.reduce((acc, curr) => acc + curr.quantity, 0)
  const { isLoggedIn, user } = useAppSelector(
    (state: StateType) => state.userReducer
  )
  const dispatch = useAppDispatch()

  const { isDarkTheme, setIsDarkTheme } = useThemeContext()

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsDarkTheme) {
      setIsDarkTheme(event.target.checked)
    }
  }

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={5}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" color="inherit" noWrap>
              Home
            </Typography>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" color="inherit" noWrap>
              All products
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" spacing={5}>
          <MaterialUISwitch
            checked={isDarkTheme}
            onChange={handleSwitchChange}
          />
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <Badge badgeContent={totalCartItems} color="warning">
              <Typography variant="h6" color="inherit" noWrap>
                🛒
              </Typography>
            </Badge>
          </Link>
          {isLoggedIn ? (
            <Stack direction="row" spacing={5}>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Avatar src={user?.avatar} />
              </Link>
              <Link
                to="/"
                style={{ textDecoration: 'none' }}
                onClick={() => dispatch(userLogout())}
              >
                <Typography variant="h6" color="inherit" noWrap>
                  Log out
                </Typography>
              </Link>
            </Stack>
          ) : (
            <Stack direction="row" spacing={5}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="inherit" noWrap>
                  Sign up
                </Typography>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="inherit" noWrap>
                  Login
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
