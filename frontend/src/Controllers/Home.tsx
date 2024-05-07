import { useCallback, type FC } from 'react'
import { useAppDispatch } from '../Utils/store'
import { logout } from '../Store/users'
import { Stack, useTheme, CssBaseline, Box } from '@mui/material'
import Component from '../Components/Home'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const handleLogOut = useCallback(() => {
    dispatch(logout())

    ls.del('YOUR_PROJECT')
  }, [dispatch])

  return <Stack
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    sx={{ backgroundColor: theme.palette.secondary.main }}
  >
    <CssBaseline />
    <Box width='32.5%' />
    <Component handleLogOut={handleLogOut} />
  </Stack>
}

export default Home
