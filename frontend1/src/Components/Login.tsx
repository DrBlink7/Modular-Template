import ModularLogo from '../modular-logo.png'
import { type FC } from 'react'
import { parseErrorMessage } from '../Utils/f'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import Loader from './Loader'

const Login: FC = () => {
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
      <div className="min-h-screen bg-error">
        <div className="hero min-h-screen">
          <div className="hero-content text-center text-error-content px-4">
            <div className="max-w-md">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-error-content/10 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-4xl">🚨</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Ops! Qualcosa è andato storto</h1>
              <p className="text-lg mb-8 text-error-content/80">{msg}</p>
              <button
                onClick={() => { void logout() }}
                className="btn btn-error btn-lg w-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                🔄 Riprova
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary font-montserrat">
      <div className="hero min-h-screen">
        <div className="hero-content text-center text-neutral-content px-4">
          <div className="max-w-2xl">
            <div className="flex justify-center mb-4 lg:mb-6">
              <img
                src={ModularLogo}
                alt="Modular Template Logo"
                className="w-64 h-64 lg:w-96 lg:h-96"
              />
            </div>
            <p className="mb-6 lg:mb-8 text-base lg:text-xl text-neutral-content/80 leading-relaxed px-4">
              Accedi alla tua dashboard per gestire i prodotti e monitorare le tue attività
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
              <button
                className="btn btn-primary btn-lg w-full sm:w-auto"
                onClick={() => { void handleLoginClick() }}
                data-testid="login-button"
              >
                Inizia la tua esperienza
              </button>
              <a
                href="https://github.com/DrBlink7/Modular-Template?tab=readme-ov-file#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg w-full sm:w-auto"
              >
                Scopri di più
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
