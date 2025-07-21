import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    // Можно ли брать в слайсе из локал стораджа (ПРоблема с SSR) !!localStorage.getItem(AUTH_TOKEN)
    isAuth: false,
  },
  selectors: {
    selectIsAuth: state => state.isAuth,
  },
  reducers: creators => ({
    setIsAuth: creators.reducer<{ isAuth: boolean }>((state, action) => {
      state.isAuth = action.payload.isAuth
    }),
  }),
})

export const appReducer = appSlice.reducer
export const { selectIsAuth } = appSlice.selectors
export const { setIsAuth } = appSlice.actions
