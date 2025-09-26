import { type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useProductPaymentStatus } from '../hooks/usePayments'

const Product: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const productId = id ? Number(id) : 0
  const { data: productPaid, isLoading, error } = useProductPaymentStatus(productId)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Verificando accesso al prodotto...</p>
      </div>
    )
  }

  if (error || !productPaid?.hasPaid) {
    navigate('/')
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-secondary-content p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Prodotto {id}
        </h1>
        <p className="text-xl mb-8">
          Dettagli del prodotto {id}...
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Torna alla Home
        </button>
      </div>
    </div>
  )
}

export default Product
