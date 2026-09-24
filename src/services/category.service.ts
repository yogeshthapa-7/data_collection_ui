import axios from 'axios'
import type {
  CategoryServerSearchRequest,
  CategoryServerSearchResponse,
  CategoryGroupServerSearchRequest,
  CategoryGroupServerSearchResponse,
} from '@/types/category'

const base_url = import.meta.env.VITE_BASE_URL || ''

export const categoryServerSearch = async (
  data: CategoryServerSearchRequest
): Promise<CategoryServerSearchResponse> => {
  const response = await axios.post<CategoryServerSearchResponse>(
    `${base_url}Category/ServerSearch`,
    data
  )
  return response.data
}

export const categoryGroupServerSearch = async (
  data: CategoryGroupServerSearchRequest
): Promise<CategoryGroupServerSearchResponse> => {
  const response = await axios.post<CategoryGroupServerSearchResponse>(
    `${base_url}CategoryGroup/ServerSearch`,
    data
  )
  return response.data
}
