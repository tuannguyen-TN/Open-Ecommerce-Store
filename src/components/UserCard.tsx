import { useState } from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { User } from '../types/User'

interface Props {
  data: User
}

const UserCard = ({ data }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        image={data.avatar}
        title="Profile Card"
        component="div"
        sx={{
          pt: '100%',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2" align="center">
          {data.name}
        </Typography>
        <Typography gutterBottom variant="h6">
          <EmailIcon fontSize="large" /> {data.email}
        </Typography>
        {data.password ? (
          showPassword ? (
            <Typography gutterBottom variant="h6">
              <KeyIcon fontSize="large" /> {data.password}{' '}
              <Button onClick={() => setShowPassword(!showPassword)}>
                <VisibilityOffIcon fontSize="large" />
              </Button>
            </Typography>
          ) : (
            <Typography gutterBottom variant="h6">
              <KeyIcon fontSize="large" />{' '}
              {new Array(data.password.length + 1).join('*')}{' '}
              <Button onClick={() => setShowPassword(!showPassword)}>
                <VisibilityIcon fontSize="large" />
              </Button>
            </Typography>
          )
        ) : null}
        <Typography gutterBottom variant="h6">
          <AssignmentIndIcon fontSize="large" /> {data.role}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard
