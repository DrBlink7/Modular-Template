import { type FC, useCallback } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import {
  clearErrorMessage,
  clearUserAuthStatus,
  selectErrorMessage,
  selectAuthStatus,
  setErrorMessage,
  login
} from '../Store/users'
import { parseErrorMessage } from '../Utils/f'
import { LockOutlined, Google } from '@mui/icons-material'
import ErrorComponent from '../Components/Error'
import LanguageSelector from '../Components/LanguageSelector'
import ImageLayout from '../Components/ImageLayout'

const Login: FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const errorMessage = useAppSelector(selectErrorMessage)
  const authStatus = useAppSelector(selectAuthStatus)

  const clearError = useCallback(() => {
    dispatch(clearUserAuthStatus())
    dispatch(clearErrorMessage())

    void navigate('/login')
  }, [dispatch, navigate])

  const handleLoginClick = useCallback(() => {
    try {
      dispatch(login())
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [dispatch])

  if (authStatus === 'error') {
    const msg = errorMessage === '' ? 'Authentication error' : errorMessage

    return (
      <ErrorComponent msg={msg} clearError={clearError} />
    )
  }

  return <ImageLayout
    data-testid="login-component"
    sx={{
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      backgroundColor: 'secondary.main'
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
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <LanguageSelector sx={{ width: '40%', maxWidth: '220px' }} />
      <Box display='flex' flexDirection='column' alignItems='center' height='65%' data-testid="login-box2" width='100%'>
        <Avatar
          sx={{ bgcolor: 'secondary.main', marginTop: '2vh' }}
          component={Paper}
          elevation={5}
          data-testid="login-avatar"
        >
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" data-testid="login-text"> {t('login.signin')} </Typography>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleLoginClick}
          sx={{ margin: '3vh 0', fontWeight: 800, boxShadow: 10, width: '40%', maxWidth: '220px' }}
          data-testid="login-button"
          startIcon={<Google />}
        >
          {t('login.signin')}
        </Button>
      </Box>
    </Box>
  </ImageLayout>
}

export default Login
