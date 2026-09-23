import axios from 'axios'
import type { LoginRequest, LoginResponse, LoggedInUserResponse, LoggedInMenusResponse } from '@/types/auth'

const base_url = import.meta.env.VITE_BASE_URL || ''

export const userLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${base_url}Authenticate/Login`, data)
  return response.data
}

export const publicAgentLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${base_url}Authenticate/PublicAgentLogin`, data)
  return response.data
}

export const getLoggedInUserInfo = async (): Promise<LoggedInUserResponse> => {
  const response = await axios.get<LoggedInUserResponse>(`${base_url}GetLoggedInUserInfo`)
  return response.data
}

export const getLoggedInMenusInfo = async (): Promise<LoggedInMenusResponse> => {
  const response = await axios.get<LoggedInMenusResponse>(`${base_url}GetLoggedInMenusInfo`)
  return response.data
}
