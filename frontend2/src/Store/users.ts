import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type State } from '../types'
import { formatThunkError, userInitialState } from '../Utils/store'
import { buyProduct, isProductPaid } from '../Api/users'

interface BaseThunk {
  token: string
}

type BuyAProduct = BaseThunk & { id: number }

export const buyAProduct = createAsyncThunk(
  '/payments/checkout/:id POST',
  async ({ token, id }: BuyAProduct, thunkApi) => {
    try {
      const response = await buyProduct({ token, id })

      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'buyAProduct error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type IsAProductPaid = BaseThunk & { id: number }

export const isAProductPaid = createAsyncThunk(
  '/payments/order-status/:id GET',
  async ({ token, id }: IsAProductPaid, thunkApi) => {
    try {
      const response = await isProductPaid({ token, id })

      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'isAProductPaid error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

export const user = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    clearUserState: () => userInitialState,
    clearUserAuthStatus: (state) => {
      state.postStatus = 'idle'
    },
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: string }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(buyAProduct.pending, (state) => {
      state.postStatus = 'loading'
    })
    builder.addCase(buyAProduct.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.postStatus = 'error'
    })
    builder.addCase(buyAProduct.fulfilled, (state) => {
      state.postStatus = 'success'
    })
  }
})

export const {
  clearUserState,
  clearUserAuthStatus,
  clearErrorMessage,
  setErrorMessage
} = user.actions

export const selectPostStatus = (state: State): State['userInfo']['postStatus'] => state.userInfo.postStatus
export const selectErrorMessage = (state: State): State['userInfo']['errorMessage'] => state.userInfo.errorMessage
