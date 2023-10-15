import { useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { fetchSingleUserInfo } from '../redux/reducers/userReducer'
import UserCard from '../components/UserCard'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoggedIn, authorizedToken, fetching } = useAppSelector(
    (state: StateType) => state.userReducer
  )

  useEffect(() => {
    if (!isLoggedIn) {
      alert('You are not authorized!')
      navigate('/')
    } else if (authorizedToken) {
      dispatch(fetchSingleUserInfo(authorizedToken.access_token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizedToken])

  return (
    <Stack direction="column" alignItems="center" justifyContent="space-evenly">
      {isLoggedIn ? (
        <Box>
          {fetching && (
            <Typography margin="normal" variant="h4">
              Fetching user data...
            </Typography>
          )}
          {user && <UserCard data={user} />}
        </Box>
      ) : (
        <Typography margin="normal" variant="h4">
          You are not authorized!
        </Typography>
      )}
    </Stack>
  )
}

export default ProfilePage
