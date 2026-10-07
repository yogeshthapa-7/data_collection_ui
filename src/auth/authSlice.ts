import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LoggedInUserData, Menu } from '@/types/auth'

interface AuthState {
  token: string | null
  accessToken: string | null
  refreshToken: string | null
  userGroupCode: string | null
  clientCode: string | null
  userInfo: LoggedInUserData | null
  menus: Menu[] | null
}

const initialState: AuthState = {
  token: null,
  accessToken: null,
  refreshToken: null,
  userGroupCode: null,
  clientCode: null,
  userInfo: null,
  menus: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userGroupCode = action.payload.userGroupCode
      state.clientCode = action.payload.clientCode
      state.userInfo = action.payload.userInfo
      state.menus = action.payload.menus
    },
    setUserInfo: (state, action: PayloadAction<LoggedInUserData>) => {
      state.userInfo = action.payload
    },
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload
    },
    logout: (state) => {
      state.token = null
      state.accessToken = null
      state.refreshToken = null
      state.userGroupCode = null
      state.clientCode = null
      state.userInfo = null
      state.menus = null
    },
  },
})

export const { setCredentials, setUserInfo, setMenus, logout } = authSlice.actions
export default authSlice.reducer