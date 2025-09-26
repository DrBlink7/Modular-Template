import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { login, isLoading, error, logout } = useKindeAuth()

  const handleLoginClick = async () => {
    try {
      await login()
    } catch (e) {
      console.error('Login error:', parseErrorMessage(e))
    }
  }

  if (error !== undefined) {
    const msg = error === '' ? 'Authentication error' : error

    return (
      <ErrorComponent msg={msg} clearError={() => {
        void logout()
      }} />
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <ImageLayout
      className="h-screen w-screen flex justify-center bg-secondary/20"
      data-testid="login-component"
    >
      <div
        className="card w-1/3 max-w-2xl bg-secondary shadow-2xl"
        data-testid="login-box"
      >
        <div className="card-body p-8 min-h-96 flex flex-col items-center justify-center gap-8">
          <div className="avatar" data-testid="login-avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="card-title text-2xl text-primary" data-testid="login-text">
            {t('login.welcome')}
          </h2>
          <button
            type="button"
            className="btn btn-primary btn-lg w-48 font-bold"
            onClick={() => { void handleLoginClick() }}
            data-testid="login-button"
          >
            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
            {t('login.signin')}
          </button>
        </div>
      </div>
    </ImageLayout>
  )
}

export default Login
