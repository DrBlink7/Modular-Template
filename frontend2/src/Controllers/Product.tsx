import { useEffect, useState, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Button, useTheme } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useAppDispatch } from '../Utils/store'
import { isAProductPaid } from '../Store/users'
import { IsProductPaidResponse } from '../types'

const Product: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { getToken } = useKindeAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const [isProductPaid, setIsProductPaid] = useState<boolean>(false)

  useEffect(() => {
    const checkIfPaid = async (productId: number) => {
      if (!getToken) return false
      const token = await getToken()
      if (!token) return false
      const res = await dispatch(isAProductPaid({ token, id: productId }))
      return (res.payload as IsProductPaidResponse).hasPaid
    }

    const checkPayments = async () => {
      if (!id || isNaN(Number(id))) {
        navigate('/')
        return
      }
      const productPaid = await checkIfPaid(Number(id))
      setIsProductPaid(productPaid)
      if (!productPaid) {
        navigate('/')
      }
    }

    checkPayments()
  }, [dispatch, getToken, id, navigate])

  if (!isProductPaid) return null

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      bgcolor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      p: 2
    }}
  >
    <Typography variant="h3" gutterBottom>
      Prodotto {id}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Dettagli del prodotto {id}...
    </Typography>
    <Button
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => navigate('/')}
      sx={{ mt: 2 }}
    >
      Torna alla Home
    </Button>
  </Box>
}

export default Product
