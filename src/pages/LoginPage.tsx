import { Avatar, Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'

const LoginPage = () => {
  const { isLoggedIn } = useAppSelector((state: StateType) => state.userReducer)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {isLoggedIn ? (
        <Typography margin="normal" variant="h4">
          You are already logged in!
        </Typography>
      ) : (
        <div>
          <LoginForm />
          <RouterLink to="/register" style={{ textDecoration: 'none' }}>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </RouterLink>
        </div>
      )}
    </Box>
  )
}

export default LoginPage
