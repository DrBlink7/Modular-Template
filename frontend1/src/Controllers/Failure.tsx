import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Failure: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-error text-error-content p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Failure
        </h1>
        <p className="text-xl mb-8">
          Your operation failed. Please try again.
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Failure
