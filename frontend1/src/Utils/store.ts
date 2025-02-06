import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { type Dispatch, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'
import { type State } from '../types'
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
  } catch {
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
  } catch {
    return false
  }
}

export const userInitialState: State['userInfo'] = {
  postStatus: 'idle',
  errorMessage: ''
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = (): ThunkDispatch<{
  userInfo: State['userInfo']
}, undefined, UnknownAction> & Dispatch<UnknownAction> => useDispatch<typeof store.dispatch>()

export const formatThunkError = (e: unknown, fallback: string): string =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e as any).response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? toString((e as any).response.data, fallback)
    : toString(e, fallback)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toString = (data: any, fallback: string): string => {
  if (typeof data === 'string') return data
  if (typeof data === 'object') {
    if (data !== null && 'message' in data) { return toString(data.message, fallback) }
    return fallback
  } else {
    return data.toString()
  }
}
