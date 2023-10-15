import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { User } from '../types/User'
import { useAppDispatch } from '../hooks/useAppDispatch'
import {
  checkEmailAvailability,
  userRegister,
} from '../redux/reducers/userReducer'
import { RegisterSchema } from '../schemas/RegisterSchema'

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  })
  const [isEmailRegistered, setIsEmailRegistered] = useState<boolean | null>(
    null
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFormSubmit = async (data: Partial<User>) => {
    const newUser: Partial<User> = {
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      avatar: data.avatar
        ? data.avatar
        : `https://ui-avatars.com/api/?name=${data.name?.replaceAll(
            /\s/g,
            '%20'
          )}`,
    }

    const res = await dispatch(userRegister(newUser))
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Signed up successfully!')
      navigate('/login')
    }
  }

  const onCheckEmailRegistered = async () => {
    const res: { isAvailable: boolean } = await dispatch(
      checkEmailAvailability(getValues('email'))
    ).unwrap()
    setIsEmailRegistered(res.isAvailable)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <TextField
            disabled={
              typeof isEmailRegistered === 'boolean' &&
              (!isEmailRegistered as boolean)
            }
            margin="normal"
            fullWidth
            label="Email address"
            {...register('email')}
          />
          {errors.email && (
            <Typography
              variant="subtitle1"
              sx={{
                color: 'red',
              }}
            >
              {errors.email?.message}
            </Typography>
          )}
        </Box>
        {getValues('email') &&
          (isEmailRegistered ? (
            <Typography
              variant="subtitle1"
              sx={{
                color: 'red',
              }}
            >
              This email is already registered.
            </Typography>
          ) : (
            <Typography
              variant="subtitle1"
              sx={{
                color: 'green',
              }}
            >
              This email can be proceeded.
            </Typography>
          ))}
        {isEmailRegistered || isEmailRegistered === null ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => onCheckEmailRegistered()}
          >
            Check Availability
          </Button>
        ) : (
          <div>
            <Box>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                {...register('name')}
              />
              {errors.name && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'red',
                  }}
                >
                  {errors.name?.message}
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'red',
                  }}
                >
                  {errors.password?.message}
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                margin="normal"
                fullWidth
                label="Avatar (blank for default)"
                {...register('avatar')}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default RegisterForm
