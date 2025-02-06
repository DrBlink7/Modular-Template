import { type EnhancedStore, type StoreEnhancer, type ThunkDispatch, type Tuple, type UnknownAction, configureStore } from '@reduxjs/toolkit'
import { type State } from '../types'
import { loadState, saveState } from '../Utils/store'
import { user } from './users'

const setupStore = (state: State): EnhancedStore<State, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<State, undefined, UnknownAction> }>, StoreEnhancer]>> =>
  configureStore({
    reducer: {
      userInfo: user.reducer
    },
    preloadedState: state
  })

const store = setupStore(loadState())

store.subscribe(() => saveState(store.getState()))

export default store
