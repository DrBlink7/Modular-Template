import { type FC } from 'react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useTheme, CssBaseline, Box } from '@mui/material'
import Component from '../Components/Home'
import ImageLayout from '../Components/ImageLayout'
import Loader from '../Components/Loader'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const theme = useTheme()
  const { logout, isLoading } = useKindeAuth()

  const handleLogOut = async () => {
    await logout()

    ls.del('YOUR_PROJECT')
  }

  if (isLoading) {
    return <Loader />
  }

  return <ImageLayout
    style={{
      backgroundColor: theme.palette.secondary.main,
      height: '100vh',
      width: '100vw',
      flexDirection: 'row'
    }}
  >
    <CssBaseline />
    <Box width='32.5%' />
    <Component handleLogOut={handleLogOut} />
  </ImageLayout>
}

export default Home
