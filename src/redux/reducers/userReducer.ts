import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { UserReducerState } from '../../types/UserReducerState'
import { User } from '../../types/User'
import { AuthorizedToken } from '../../types/AuthorziedToken'
import { UserCredentials } from '../../types/UserCredentials'

export const initialUserState: UserReducerState = {
  user: null,
  fetching: false,
  loggingIn: false,
  isLoggedIn: false,
  authorizedToken: null,
  error: '',
}

export const userLogin = createAsyncThunk<
  AuthorizedToken,
  UserCredentials,
  { rejectValue: string }
>(
  'user/userLogin',
  async ({ email, password }: UserCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://api.escuelajs.co/api/v1/auth/login',
        { email, password }
      )
      return res.data
    } catch (e) {
      const err = e as Error
      return rejectWithValue(err.message)
    }
  }
)

export const fetchSingleUserInfo = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>(
  'user/fetchSingleUserInfo',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        'https://api.escuelajs.co/api/v1/auth/profile',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (e) {
      const err = e as Error
      return rejectWithValue(err.message)
    }
  }
)

export const checkEmailAvailability = createAsyncThunk<
  { isAvailable: boolean },
  string,
  { rejectValue: string }
>('user/checkEmailAvailability', async (email: string, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      'https://api.escuelajs.co/api/v1/users/is-available',
      {
        email,
      }
    )
    return res.data
  } catch (e) {
    const err = e as Error
    return rejectWithValue(err.message)
  }
})

export const userRegister = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>('user/userRegister', async (newUser: Partial<User>, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      'https://api.escuelajs.co/api/v1/users/',
      newUser
    )
    return res.data
  } catch (e) {
    const err = e as Error
    return rejectWithValue(err.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    userLogout: (state) => {
      return Object.assign(state, initialUserState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        authorizedToken: action.payload,
      }
    })
    builder.addCase(userLogin.pending, (state, action) => {
      return {
        ...state,
        loggingIn: true,
        error: '',
      }
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loggingIn: false,
          error: action.payload,
        }
      }
    })
    builder.addCase(fetchSingleUserInfo.fulfilled, (state, action) => {
      return {
        ...state,
        fetching: false,
        user: action.payload,
      }
    })
    builder.addCase(fetchSingleUserInfo.pending, (state, action) => {
      return {
        ...state,
        fetching: true,
        error: '',
      }
    })
    builder.addCase(fetchSingleUserInfo.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    })
    builder.addCase(checkEmailAvailability.fulfilled, (state, action) => {})
    builder.addCase(checkEmailAvailability.pending, (state, action) => {})
    builder.addCase(checkEmailAvailability.rejected, (state, action) => {})
    builder.addCase(userRegister.fulfilled, (state, action) => {})
    builder.addCase(userRegister.pending, (state, action) => {})
    builder.addCase(userRegister.rejected, (state, action) => {})
  },
})

const userReducer = userSlice.reducer
export const { userLogout } = userSlice.actions
export default userReducer
