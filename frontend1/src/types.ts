/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Forms
 */

/**
 * API
*/

/**
 * Redux
 */
interface State {
  userInfo: UserStore
}
interface Authenticated {
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
