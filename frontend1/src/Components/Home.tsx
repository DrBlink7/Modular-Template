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
    <div className="h-screen bg-base-100 overflow-y-auto font-montserrat" data-testid="home-component">
      {/* Header */}
      <div className="navbar bg-base-100 border-b border-base-300 shadow-sm">
        <div className="navbar-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-content text-lg">🚀</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-base-content">Modular Template</h1>
              <p className="text-xs text-base-content/60">Dashboard</p>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <ThemeToggle />
          <button
            onClick={handleLogOut}
            className="btn btn-ghost btn-sm"
          >
            {t('home.logoutButton')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {/* Welcome Section */}
        <div className="hero bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl mb-8">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-base-content mb-4">
                Benvenuto nella Dashboard
              </h1>
              <p className="text-lg text-base-content/70 mb-8">
                Gestisci i tuoi prodotti e monitora le tue attività in tempo reale
              </p>
              <div className="stats stats-horizontal shadow-lg bg-base-100/50 backdrop-blur-sm">
                <div className="stat">
                  <div className="stat-title text-base-content/60">Prodotti Totali</div>
                  <div className="stat-value text-primary">2</div>
                  <div className="stat-desc text-base-content/60">Disponibili</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-base-content/60">Acquistati</div>
                  <div className="stat-value text-secondary">
                    {product1Paid && product2Paid ? '2' : product1Paid || product2Paid ? '1' : '0'}
                  </div>
                  <div className="stat-desc text-base-content/60">Questo mese</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prodotto 1 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
            <div className="card-body p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <div>
                    <h2 className="card-title text-2xl text-base-content">Prodotto 1</h2>
                    <p className="text-sm text-base-content/60">Soluzione Premium</p>
                  </div>
                </div>
                <div className="badge badge-primary badge-lg font-semibold">Premium</div>
              </div>

              <div className="mb-8 space-y-3">
                <div className="flex items-center text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Funzionalità avanzate e personalizzate
                </div>
                <div className="flex items-center text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Supporto dedicato 24/7
                </div>
                <div className="flex items-center text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Aggiornamenti automatici e sicuri
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
                  className="btn btn-primary w-full btn-lg font-semibold"
                  onClick={() => orderProduct(1)}
                  disabled={buyProductMutation.isPending}
                  data-testid="order-product-1"
                >
                  {buyProductMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Elaborazione...
                    </>
                  ) : (
                    <>
                      🛒 Ordina Prodotto 1
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Prodotto 2 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
            <div className="card-body p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <h2 className="card-title text-2xl text-base-content">Prodotto 2</h2>
                    <p className="text-sm text-base-content/60">Soluzione Enterprise</p>
                  </div>
                </div>
                <div className="badge badge-secondary badge-lg font-semibold">Enterprise</div>
              </div>

              <div className="mb-8 space-y-3">
                <div className="flex items-center text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Funzionalità enterprise complete
                </div>
                <div className="flex items-center text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Supporto dedicato e prioritario
                </div>
                <div className="flex items-center text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Personalizzazione avanzata e scalabile
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
                  className="btn btn-secondary w-full btn-lg font-semibold"
                  onClick={() => orderProduct(2)}
                  disabled={buyProductMutation.isPending}
                  data-testid="order-product-2"
                >
                  {buyProductMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Elaborazione...
                    </>
                  ) : (
                    <>
                      🛒 Ordina Prodotto 2
                    </>
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
