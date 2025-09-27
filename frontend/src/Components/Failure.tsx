import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Failure: FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        maxWidth: '28rem',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1rem' }}>
          Errore
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1.5rem' }}>
          La tua operazione non è stata completata. Riprova più tardi.
        </p>
        <button
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6'
          }}
          onClick={() => navigate('/')}
        >
          Torna alla Home
        </button>
      </div>
    </div>
  )
}

export default Failure
