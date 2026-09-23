import type { UserSession, LoggedInUserData, Menu } from '@/types/auth'

const TOKEN_KEY = 'token'
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_GROUP_CODE_KEY = 'user_group_code'
const CLIENT_CODE_KEY = 'client_code'
const USER_INFO_KEY = 'user_info'
const MENUS_KEY = 'menus'

export const setUserSession = (data: {
  token: string
  access_token: string
  refresh_token: string
  user_group_code: string
  clientcode: string
}) => {
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
  localStorage.setItem(USER_GROUP_CODE_KEY, data.user_group_code)
  localStorage.setItem(CLIENT_CODE_KEY, data.clientcode)
}

export const setUserInfo = (userInfo: LoggedInUserData) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

export const setMenus = (menus: Menu[]) => {
  localStorage.setItem(MENUS_KEY, JSON.stringify(menus))
}

export const getUserInfo = (): LoggedInUserData | null => {
  const item = localStorage.getItem(USER_INFO_KEY)
  return item ? JSON.parse(item) : null
}

export const getMenus = (): Menu[] | null => {
  const item = localStorage.getItem(MENUS_KEY)
  return item ? JSON.parse(item) : null
}

export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export const getAccessToken = (): string | null => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token || token === 'undefined' || token === 'null') {
    return null
  }
  return token
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const getUserSession = (): UserSession | null => {
  const token = localStorage.getItem(TOKEN_KEY)
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  const userGroupCode = localStorage.getItem(USER_GROUP_CODE_KEY)
  const clientCode = localStorage.getItem(CLIENT_CODE_KEY)

  if (!token || !accessToken) return null

  const userInfo = getUserInfo()
  const menus = getMenus()

  return {
    token,
    accessToken,
    refreshToken: refreshToken || '',
    userGroupCode: userGroupCode || '',
    clientCode: clientCode || '',
    userInfo,
    menus,
  }
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_GROUP_CODE_KEY)
  localStorage.removeItem(CLIENT_CODE_KEY)
  localStorage.removeItem(USER_INFO_KEY)
  localStorage.removeItem(MENUS_KEY)
}
