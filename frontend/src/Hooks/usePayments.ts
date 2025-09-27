import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { paymentsApi } from '../services/api'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { IsProductPaidResponse, BuyProductResponse } from '../types'

// Query keys following Cursor Rules pattern
export const QUERY_KEYS = {
  PAYMENTS_ALL: ['payments'] as const,
  PAYMENT_STATUS: (productId: number) => [...QUERY_KEYS.PAYMENTS_ALL, 'status', productId] as const,
  PAYMENT_CHECKOUT: (productId: number) => [...QUERY_KEYS.PAYMENTS_ALL, 'checkout', productId] as const
} as const

// Hook per verificare se un prodotto è stato pagato
export const useProductPaymentStatus = (
  productId: number,
  options?: UseQueryOptions<IsProductPaidResponse, Error, IsProductPaidResponse>
) => {
  const { getToken } = useKindeAuth()

  return useQuery<IsProductPaidResponse, Error, IsProductPaidResponse>({
    queryKey: QUERY_KEYS.PAYMENT_STATUS(productId),
    queryFn: async () => {
      const token = await getToken?.()
      if (!token) throw new Error('No token available')
      return paymentsApi.isProductPaid(token, productId)
    },
    enabled: !!getToken,
    staleTime: 60_000, // 1 minuto (seguendo Cursor Rules)
    retry: (failureCount, error) => {
      // Non riprovare su errori 4xx
      if (error instanceof Error && 'status' in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const status = (error as any).status
        if (status >= 400 && status < 500) {
          return false
        }
      }
      return failureCount < 3
    },
    ...options
  })
}

// Hook per acquistare un prodotto
export const useBuyProduct = () => {
  const { getToken } = useKindeAuth()
  const queryClient = useQueryClient()

  return useMutation<BuyProductResponse, Error, number>({
    mutationFn: async (productId: number) => {
      const token = await getToken?.()
      if (!token) throw new Error('No token available')
      return paymentsApi.buyProduct(token, productId)
    },
    onSuccess: (data, productId) => {
      // Invalida le query per aggiornare lo stato
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PAYMENT_STATUS(productId)
      })

      // Naviga al checkout se c'è un URL
      if (data.url) {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      console.error('Error buying product:', error)
    }
  })
}

// Hook per verificare lo stato di pagamento di tutti i prodotti
export const useAllProductPaymentStatus = (productIds: number[]) => {
  const { getToken } = useKindeAuth()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<Array<{ productId: number; hasPaid: boolean; error: any }>, Error>({
    queryKey: [...QUERY_KEYS.PAYMENTS_ALL, 'all-products', productIds],
    queryFn: async () => {
      const token = await getToken?.()
      if (!token) throw new Error('No token available')

      const results = await Promise.allSettled(
        productIds.map(id => paymentsApi.isProductPaid(token, id))
      )

      return results.map((result, index) => ({
        productId: productIds[index],
        hasPaid: result.status === 'fulfilled' ? result.value.hasPaid : false,
        error: result.status === 'rejected' ? result.reason : null
      }))
    },
    enabled: !!getToken && productIds.length > 0,
    staleTime: 60_000 // 1 minuto (seguendo Cursor Rules)
  })
}
