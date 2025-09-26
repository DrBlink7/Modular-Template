import { useCallback, type FC } from 'react'
import { useAppDispatch } from '../Utils/store'
import { logout } from '../Store/users'
import { CssBaseline, Box } from '@mui/material'
import Component from '../Components/Home'
import ImageLayout from '../Components/ImageLayout'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  const handleLogOut = useCallback(() => {
    dispatch(logout())

    ls.del('YOUR_PROJECT')
  }, [dispatch])

  return <ImageLayout
    sx={{
      backgroundColor: 'secondary.main',
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
