import { type FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useNavigate } from 'react-router-dom'
import { useProductPaymentStatus, useBuyProduct } from '../hooks/usePayments'
import { useLogger } from '../Hooks/Logger'
import { ThemeToggle } from './ThemeToggle'

interface HomeProps {
  handleLogOut: () => void
}

const Home: FC<HomeProps> = ({ handleLogOut }) => {
  const { t } = useTranslation()
  const { getToken } = useKindeAuth()
  const Logger = useLogger()
  const navigate = useNavigate()

  // Query per verificare se i prodotti sono stati pagati
  const {
    data: product1Data,
    isLoading: loading1,
    error: error1
  } = useProductPaymentStatus(1)

  const {
    data: product2Data,
    isLoading: loading2,
    error: error2
  } = useProductPaymentStatus(2)

  // Mutation per acquistare un prodotto
  const buyProductMutation = useBuyProduct()

  const product1Paid = product1Data?.hasPaid ?? false
  const product2Paid = product2Data?.hasPaid ?? false

  const navigateTo = (productId: number) => {
    navigate(`/product/${productId}`)
  }

  const orderProduct = (productId: number) => {
    Logger.writeEvent(`Attempting to buy product ${productId}`)
    buyProductMutation.mutate(productId)
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-200 shadow-2xl" data-testid="home-component">
        <div className="card-body">
          {/* Header con toggle tema */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
            <ThemeToggle />
          </div>

          {/* Prodotti */}
          <div className="space-y-6">
            {/* Prodotto 1 */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl">Prodotto 1</h2>
                {loading1 ? (
                  <div className="flex justify-center">
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : error1 ? (
                  <div className="alert alert-error">
                    <span>Errore nel caricamento dello stato del prodotto</span>
                  </div>
                ) : product1Paid ? (
                  <Fragment>
                    <p className="text-base-content/70 mb-4">
                      Hai già acquistato prodotto 1, vai alla pagina del prodotto.
                    </p>
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => navigateTo(1)}
                      data-testid="go-to-product-1"
                    >
                      Vai al Prodotto 1
                    </button>
                  </Fragment>
                ) : (
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => orderProduct(1)}
                    disabled={buyProductMutation.isPending}
                    data-testid="order-product-1"
                  >
                    {buyProductMutation.isPending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      'Ordina Prodotto 1'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Prodotto 2 */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl">Prodotto 2</h2>
                {loading2 ? (
                  <div className="flex justify-center">
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : error2 ? (
                  <div className="alert alert-error">
                    <span>Errore nel caricamento dello stato del prodotto</span>
                  </div>
                ) : product2Paid ? (
                  <Fragment>
                    <p className="text-base-content/70 mb-4">
                      Hai già acquistato prodotto 2, vai alla pagina del prodotto.
                    </p>
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => navigateTo(2)}
                      data-testid="go-to-product-2"
                    >
                      Vai al Prodotto 2
                    </button>
                  </Fragment>
                ) : (
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => orderProduct(2)}
                    disabled={buyProductMutation.isPending}
                    data-testid="order-product-2"
                  >
                    {buyProductMutation.isPending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      'Ordina Prodotto 2'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="card-actions justify-end mt-8">
            <button
              className="btn btn-outline btn-error w-full"
              onClick={handleLogOut}
              data-testid="logout-button"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              {t('home.logoutButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
