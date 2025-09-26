import { type FC } from 'react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import Component from '../Components/Home'
import ImageLayout from '../Components/ImageLayout'
import Loader from '../Components/Loader'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const { logout, isLoading } = useKindeAuth()

  const handleLogOut = async () => {
    await logout()

    ls.del('YOUR_PROJECT')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <ImageLayout className="h-screen w-screen flex flex-row bg-secondary/20">
      <div className="w-1/3" />
      <Component handleLogOut={handleLogOut} />
    </ImageLayout>
  )
}

export default Home
