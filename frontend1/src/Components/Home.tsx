import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useProductPaymentStatus, useBuyProduct } from '../hooks/usePayments'
import { useLogger } from '../hooks/Logger'
import ThemeToggle from './ThemeToggle'

interface HomeProps {
  handleLogOut: () => void
}

const Home: FC<HomeProps> = ({ handleLogOut }) => {
  const { t } = useTranslation()
  const Logger = useLogger()

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

  const orderProduct = (productId: number) => {
    Logger.writeEvent(`Attempting to buy product ${productId}`)
    buyProductMutation.mutate(productId)
  }

  return (
    <div className="h-screen bg-base-100 overflow-y-auto" data-testid="home-component">
      {/* Header */}
      <div className="navbar bg-base-200 shadow-sm">
        <div className="navbar-start">
          <h1 className="text-xl font-bold text-base-content">Modular Template</h1>
        </div>
        <div className="navbar-end">
          <ThemeToggle />
          <button
            onClick={handleLogOut}
            className="btn btn-outline btn-sm"
          >
            {t('home.logoutButton')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="hero bg-base-200 rounded-3xl mb-8">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-base-content mb-4">Dashboard</h1>
              <p className="text-lg text-base-content/70 mb-6">
                Gestisci i tuoi prodotti e monitora le tue attività
              </p>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Prodotti Totali</div>
                  <div className="stat-value text-primary">2</div>
                  <div className="stat-desc">Disponibili</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Acquistati</div>
                  <div className="stat-value text-secondary">
                    {product1Paid && product2Paid ? '2' : product1Paid || product2Paid ? '1' : '0'}
                  </div>
                  <div className="stat-desc">Questo mese</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prodotto 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title text-2xl text-primary">Prodotto 1</h2>
                <div className="badge badge-primary badge-lg">Premium</div>
              </div>

              <div className="mb-6">
                <div className="flex items-center text-sm text-base-content/60 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Funzionalità avanzate
                </div>
                <div className="flex items-center text-sm text-base-content/60 mb-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Supporto 24/7
                </div>
                <div className="flex items-center text-sm text-base-content/60">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Aggiornamenti automatici
                </div>
              </div>

              {loading1 ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : error1 ? (
                <div className="alert alert-error">
                  <span>❌ Errore nel caricamento dello stato del prodotto</span>
                </div>
              ) : product1Paid ? (
                <div className="space-y-4">
                  <div className="alert alert-success">
                    <span>✅ Hai già acquistato Prodotto 1</span>
                  </div>
                  <button
                    className="btn btn-disabled w-full"
                    disabled
                  >
                    Prodotto già acquistato
                  </button>
                </div>
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
                    '🛒 Ordina Prodotto 1'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Prodotto 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title text-2xl text-secondary">Prodotto 2</h2>
                <div className="badge badge-secondary badge-lg">Enterprise</div>
              </div>

              <div className="mb-6">
                <div className="flex items-center text-sm text-base-content/60 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Funzionalità enterprise
                </div>
                <div className="flex items-center text-sm text-base-content/60 mb-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Supporto dedicato
                </div>
                <div className="flex items-center text-sm text-base-content/60">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Personalizzazione avanzata
                </div>
              </div>

              {loading2 ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-lg text-secondary"></span>
                </div>
              ) : error2 ? (
                <div className="alert alert-error">
                  <span>❌ Errore nel caricamento dello stato del prodotto</span>
                </div>
              ) : product2Paid ? (
                <div className="space-y-4">
                  <div className="alert alert-success">
                    <span>✅ Hai già acquistato Prodotto 2</span>
                  </div>
                  <button
                    className="btn btn-disabled w-full"
                    disabled
                  >
                    Prodotto già acquistato
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-secondary w-full"
                  onClick={() => orderProduct(2)}
                  disabled={buyProductMutation.isPending}
                  data-testid="order-product-2"
                >
                  {buyProductMutation.isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    '🛒 Ordina Prodotto 2'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
