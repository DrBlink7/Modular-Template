import { type FC } from 'react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import * as ls from '../utilities/ls'
import Loader from '../components/Loader'
import HomeComponent from '../components/Home'

const Home: FC = () => {
  const { logout, isLoading } = useKindeAuth()

  const handleLogOut = async () => {
    await logout()
    ls.del('YOUR_PROJECT')
  }

  if (isLoading) {
    return <Loader />
  }

  return <HomeComponent handleLogOut={handleLogOut} />
}

export default Home
