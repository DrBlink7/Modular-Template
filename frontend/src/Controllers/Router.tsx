import { type FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import Home from './Home'
import Loader from '../Components/Loader'
import Failure from '../Components/Failure'
import Product from '../Components/Product'
import Success from '../Components/Success'
import Login from '../Components/Login'

const Router: FC = () => {
  const { isAuthenticated, isLoading } = useKindeAuth()

  if (isLoading) return <Loader />

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/success" element={isAuthenticated ? <Success /> : <Navigate to="/login" />} />
      <Route path="/failure" element={isAuthenticated ? <Failure /> : <Navigate to="/login" />} />
      <Route path="/product/:id" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default Router
