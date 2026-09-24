import axios from 'axios'
import type { CategoryServerSearchRequest, CategoryServerSearchResponse } from '@/types/category'

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
