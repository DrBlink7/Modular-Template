/**
 * Forms
 */

/**
 * API
*/
export interface DeleteResponse {
  message: string
}
export interface BuyProduct { token: string, id: number }
export interface BuyProductResponse { url: string | null }
export interface IsProductPaid { token: string, id: number }
export interface IsProductPaidResponse { hasPaid: boolean }
/**
 * API Response Types
 */
export interface Authenticated {
  token: string
}
/**
 * Utils
 */
export interface WithChildren {
  children?: React.ReactNode
}
