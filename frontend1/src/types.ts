/**
 * Forms
 */

/**
 * API
*/

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
  user: User
  isUserLogged: boolean
  errorMessage: string
  token: string
  authStatus: Status
}
interface User {
  picture: string
  email: string
  familyName: string
  givenName: string
  hd: string
  id: string
  locale: string
  name: string
  verifiedEmail: boolean
}
/**
 * Utils
 */
export interface WithChildren {
  children?: React.ReactNode
}
