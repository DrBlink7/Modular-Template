import { type FC, Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Typography, Button, Paper, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { buyAProduct, isAProductPaid, setErrorMessage } from '../Store/users'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useAppDispatch } from '../Utils/store'
import { BuyProductResponse, IsProductPaidResponse } from '../types'
import { useLogger } from '../Hooks/Logger'
import { useNavigate } from 'react-router-dom'

interface HomeProps {
  handleLogOut: () => void
}

const Home: FC<HomeProps> = ({ handleLogOut }) => {
  const { t } = useTranslation()
  const { getToken } = useKindeAuth()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const Logger = useLogger()
  const navigate = useNavigate()

  const [isProduct1Paid, setIsProduct1Paid] = useState<boolean>(false)
  const [isProduct2Paid, setIsProduct2Paid] = useState<boolean>(false)

  useEffect(() => {
    const checkIfPaid = async (productId: number) => {
      if (!getToken) return false
      const token = await getToken()
      if (!token) return false
      const res = await dispatch(isAProductPaid({ token, id: productId }))
      return (res.payload as IsProductPaidResponse).hasPaid
    }
    const checkPayments = async () => {
      const [product1Paid, product2Paid] = await Promise.all([
        checkIfPaid(1),
        checkIfPaid(2)
      ])
      setIsProduct1Paid(product1Paid)
      setIsProduct2Paid(product2Paid)
    }
    checkPayments()
  }, [dispatch, getToken])

  const navigateTo = async (productId: number) => {
    navigate(`/product/${productId}`)
  }

  const orderProduct = async (productId: number) => {
    try {
      if (getToken) {
        const token = await getToken()
        if (token) {
          const res = await dispatch(buyAProduct({ token, id: productId }))
          const checkoutUrl = (res.payload as BuyProductResponse).url
          if (checkoutUrl) {
            Logger.writeEvent('Navigating to checkout')
            window.location.href = checkoutUrl
          }
        }
      }
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }

  return <Box
    component={Paper}
    elevation={10}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: '35%',
      maxWidth: '600px',
      padding: '4%',
      borderRadius: '5%',
      height: '60%',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main
    }}
    data-testid="home-component"
  >
    <Box display="flex" justifyContent="center" gap="2vw" width="100%" flexDirection="column">
      {
        isProduct1Paid
          ? <Fragment>
            <Typography>Hai già acquistato prodotto 1, vai alla pagina del prodotto.</Typography>
            <Button
              variant="contained"
              sx={{ boxShadow: 10 }}
              fullWidth
              onClick={() => navigateTo(1)}
              disabled={!isProduct1Paid}
              data-testid="go-to-product-1"
            >
              Prodotto 1
            </Button>
          </Fragment>
          : <Button
            variant="contained"
            sx={{ boxShadow: 10 }}
            fullWidth
            onClick={() => orderProduct(1)}
            disabled={isProduct1Paid}
            data-testid="order-product-1"
          >
            Ordina Prodotto 1
          </Button>
      }
      <Divider />
      {
        isProduct2Paid
          ? <Fragment>
            <Typography>Hai già acquistato prodotto 2, vai alla pagina del prodotto.</Typography>
            <Button
              variant="contained"
              sx={{ boxShadow: 10 }}
              fullWidth
              onClick={() => navigateTo(2)}
              disabled={!isProduct2Paid}
              data-testid="go-to-product-2"
            >
              Prodotto 2
            </Button>
          </Fragment>
          : <Button
            variant="contained"
            sx={{ boxShadow: 10 }}
            fullWidth
            onClick={() => orderProduct(2)}
            disabled={isProduct2Paid}
            data-testid="order-product-2"
          >
            Ordina Prodotto 2
          </Button>
      }
    </Box>

    <Button
      variant="contained"
      endIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
      sx={{ boxShadow: 10 }}
      fullWidth
      onClick={handleLogOut}
      data-testid="logout-button"
    >
      {t('home.logoutButton')}
    </Button>
  </Box>
}

export default Home
