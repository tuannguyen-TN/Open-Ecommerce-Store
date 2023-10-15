import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <Box>
      <Typography variant="h4">
        You seem to get in the wrong page. Click <Link to="/">here</Link> to
        return to homepage.
      </Typography>
    </Box>
  )
}

export default ErrorPage
