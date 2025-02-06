import { type FC } from 'react'
import {
  CssBaseline,
  Box,
  Avatar,
  Button,
  Typography,
  useTheme,
  Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../Utils/store'
import { setErrorMessage, clearErrorMessage } from '../Store/users'
import { parseErrorMessage } from '../Utils/f'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/logo512.png'
import ErrorComponent from '../Components/Error'
import ImageLayout from '../Components/ImageLayout'
import Loader from '../Components/Loader'

const Login: FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { login, isLoading, error, logout } = useKindeAuth()

  const handleLoginClick = async () => {
    try {
      await login()
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }

  if (error !== undefined) {
    const msg = error === '' ? 'Authentication error' : error

    return (
      <ErrorComponent msg={msg} clearError={() => {
        dispatch(clearErrorMessage())
        void logout()
      }} />
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return <ImageLayout
    data-testid="login-component"
    style={{
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      backgroundColor: theme.palette.secondary.light
    }}
  >
    <CssBaseline />
    <Box
      component={Paper}
      elevation={10}
      data-testid="login-box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '35%',
        maxWidth: '600px',
        padding: '4%',
        borderRadius: '5%',
        minHeight: '55%',
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
      }}
    >
      <Box display='flex' flexDirection='column' alignItems='center' height='100%' data-testid="login-box2" width='100%' justifyContent='center' gap='3vh'>
        <Avatar
          sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, width: '75px', height: '75px' }}
          component={Paper}
          elevation={5}
          data-testid="login-avatar"
        >
          <img src={Logo} height='75px' />
        </Avatar>
        <Typography variant="h5" data-testid="login-text"> {t('login.welcome')} </Typography>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          onClick={() => { void handleLoginClick() }}
          sx={{ fontWeight: 800, boxShadow: 10, width: '40%', maxWidth: '220px' }}
          data-testid="login-button"
          startIcon={<FontAwesomeIcon icon={faRightToBracket} />}
        >
          {t('login.signin')}
        </Button>
      </Box>
    </Box>
  </ImageLayout>
}

export default Login
