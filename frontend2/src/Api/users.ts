import { type AxiosResponse } from 'axios'
import { IsProductPaid, IsProductPaidResponse, type BuyProduct, type BuyProductResponse } from '../types'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './axios'

export const buyProduct = async ({ token, id }: BuyProduct): Promise<AxiosResponse<BuyProductResponse>> =>
  await axiosClient.post(`/payments/checkout/${id}/`, {}, createApiHeaders(token))

export const isProductPaid = async ({ token, id }: IsProductPaid): Promise<AxiosResponse<IsProductPaidResponse>> =>
  await axiosClient.get(`/payments/order-status/${id}/`, createApiHeaders(token))
