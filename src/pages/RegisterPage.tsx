import { Avatar, Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

import RegisterForm from '../components/RegisterForm'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'

const RegisterPage = () => {
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
        Sign Up
      </Typography>
      {isLoggedIn ? (
        <Typography margin="normal" variant="h4">
          You are currently logged in!
        </Typography>
      ) : (
        <div>
          <RegisterForm />
          <RouterLink to="/login" style={{ textDecoration: 'none' }}>
            <Link href="/login" variant="body2">
              {'Already have an account? Sign In'}
            </Link>
          </RouterLink>
        </div>
      )}
    </Box>
  )
}

export default RegisterPage
