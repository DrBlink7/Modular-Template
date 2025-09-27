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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white/80 backdrop-blur-sm py-10 px-8 shadow-2xl rounded-3xl border border-white/20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-xl mb-6">
                <span className="text-3xl text-white">🚨</span>
              </div>
              <h1 className="text-3xl font-bold text-red-600 mb-4">Ops! Qualcosa è andato storto</h1>
              <p className="text-gray-600 mb-8 text-lg">{msg}</p>
              <button
                onClick={() => { void logout() }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
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
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f8fafc' }}>
      {/* Left Side - Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '28rem', width: '100%' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Modular Template
            </h1>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Ciao!
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              Bentornato nella community.
            </p>
          </div>

          {/* Login Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Login Button */}
            <button
              type="button"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem 1.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.75rem',
                color: '#374151',
                backgroundColor: '#ffffff',
                fontSize: '1.125rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'
              }}
              onClick={() => { void handleLoginClick() }}
              data-testid="login-button"
            >
              Accedi con Kinde Auth
            </button>

            {/* Divider */}



            {/* Sign Up Link */}

          </div>
        </div>
      </div>

      {/* Right Side - Promotional */}
      <div style={{
        display: 'none',
        flex: 1,
        background: 'linear-gradient(to bottom, #2563eb, #7c3aed)',
        borderRadius: '0 1.5rem 1.5rem 0',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <div style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', width: '8rem', height: '8rem', backgroundColor: '#ffffff', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '8rem', right: '5rem', width: '6rem', height: '6rem', backgroundColor: '#ffffff', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '5rem', left: '4rem', width: '4rem', height: '4rem', backgroundColor: '#ffffff', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '8rem', right: '2.5rem', width: '5rem', height: '5rem', backgroundColor: '#ffffff', borderRadius: '50%' }}></div>
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center', color: '#ffffff', zIndex: 10, padding: '2rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Scopri le gemme nascoste del mondo, un passo alla volta.
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#dbeafe', lineHeight: '1.75' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
