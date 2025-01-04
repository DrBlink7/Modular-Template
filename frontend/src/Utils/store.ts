/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { type Dispatch, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'
import type store from '../Store'
import * as ls from './ls'

export const loadState = (): State => {
  try {
    const serializedStore = ls.get('YOUR_PROJECT')

    if (serializedStore === null || serializedStore === undefined) {
      return {
        userInfo: userInitialState
      }
    }

    return {
      ...serializedStore
    }
  } catch (e) {
    return {
      userInfo: userInitialState
    }
  }
}

export const saveState = (state: State): boolean => {
  const { ...stateToSave } = state
  try {
    ls.set('YOUR_PROJECT', stateToSave)

    return ls.has('YOUR_PROJECT')
  } catch (e) {
    return false
  }
}

export const userInitialState: UserStore = {
  user: {
    email: '',
    familyName: '',
    givenName: '',
    hd: '',
    id: '',
    locale: '',
    name: '',
    picture: '',
    verifiedEmail: false
  },
  authStatus: 'idle',
  isUserLogged: false,
  token: '',
  errorMessage: ''
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = (): ThunkDispatch<{
  userInfo: UserStore
}, undefined, UnknownAction> & Dispatch<UnknownAction> => useDispatch<typeof store.dispatch>()

export const formatThunkError = (e: unknown, fallback: string): string =>
  Boolean((e as any).response.data)
    ? toString((e as any).response.data, fallback)
    : toString(e, fallback)

const toString = (data: unknown, fallback: string): string => {
  if (typeof data === 'string') return data
  if (typeof data === 'object') {
    if (data !== null && 'message' in data) { return toString(data.message, fallback) }
    return fallback
  } else {
    return (data as unknown as any).toString()
  }
}
