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
 * Redux
 */
export interface State {
  userInfo: UserStore
}
export interface Authenticated {
  token: string
}
type Status = 'success' | 'idle' | 'error' | 'loading'
interface UserStore {
  errorMessage: string
  postStatus: Status
}
/**
 * Utils
 */
export interface WithChildren {
  children?: React.ReactNode
}
