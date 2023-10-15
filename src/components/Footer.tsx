import { Typography } from '@mui/material'

const Footer = () => {
  return (
    <Typography variant="body2" color="text.primary" align="center">
      Copyright © Tuan Nguyen {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer
