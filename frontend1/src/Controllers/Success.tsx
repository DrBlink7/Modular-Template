import { FC } from 'react'
import { Box, Typography, Button, useTheme } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Success: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      bgcolor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      p: 2
    }}
  >
    <Typography variant="h3" gutterBottom>
      Success
    </Typography>
    <Typography variant="body1" gutterBottom>
      Your operation was successful!
    </Typography>
    <Button
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => navigate('/')}
      sx={{ mt: 2 }}
    >
      Back to Home
    </Button>
  </Box>
}

export default Success
