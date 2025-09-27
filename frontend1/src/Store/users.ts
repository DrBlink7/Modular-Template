import { createSlice } from '@reduxjs/toolkit'
import { userInitialState } from '../Utils/store'

export const user = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    clearUserState: () => userInitialState,
    logout: (state) => {
      state.isUserLogged = false
    },
    login: (state) => {
      state.isUserLogged = true
    },
    clearUserAuthStatus: (state) => {
      state.authStatus = 'idle'
    },
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: string }) => {
      state.errorMessage = action.payload
    }
  }
})

export const {
  clearUserState,
  clearUserAuthStatus,
  login,
  logout,
  clearErrorMessage,
  setErrorMessage
} = user.actions

export const selectIsUserLogged = (state: State): State['userInfo']['isUserLogged'] => state.userInfo.isUserLogged
export const selectUser = (state: State): State['userInfo']['user'] => state.userInfo.user
export const selectAuthStatus = (state: State): State['userInfo']['authStatus'] => state.userInfo.authStatus
export const selectToken = (state: State): State['userInfo']['token'] => state.userInfo.user.id // Change it with state.userInfo.token when you implement flow
export const selectErrorMessage = (state: State): State['userInfo']['errorMessage'] => state.userInfo.errorMessage
