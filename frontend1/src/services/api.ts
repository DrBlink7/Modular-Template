import { createApiHeaders } from '../Utils/f';
import axiosClient from '../Api/axios';
import { BuyProductResponse, IsProductPaidResponse } from '../types';

export const paymentsApi = {
  // Acquista un prodotto
  buyProduct: async (token: string, productId: number): Promise<BuyProductResponse> => {
    const response = await axiosClient.post(
      `/payments/checkout/${productId}/`,
      {},
      createApiHeaders(token)
    );
    return response.data;
  },

  // Verifica se un prodotto è stato pagato
  isProductPaid: async (token: string, productId: number): Promise<IsProductPaidResponse> => {
    const response = await axiosClient.get(
      `/payments/order-status/${productId}/`,
      createApiHeaders(token)
    );
    return response.data;
  },
};
