import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectAppError: state => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
  },

  reducers: create => ({
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer
