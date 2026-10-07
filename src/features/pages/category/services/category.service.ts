import axios from 'axios'
import type {
  CategoryServerSearchRequest,
  CategoryServerSearchResponse,
  CategoryGroupServerSearchRequest,
  CategoryGroupServerSearchResponse,
  CategoryGroupSelectItem,
} from '@/features/pages/category/types/category'

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

export const fetchCategories = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ''
): Promise<CategoryServerSearchResponse> => {
  const payload: CategoryServerSearchRequest = {
    model: {
      draw: page,
      start: (page - 1) * pageSize,
      length: pageSize,
      search: {
        value: '',
        regex: '',
      },
    },
    param: {
      CategoryID: 0,
    },
  }
  return categoryServerSearch(payload)
}

export const fetchCategoryGroups = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ''
): Promise<CategoryGroupServerSearchResponse> => {
  const payload: CategoryGroupServerSearchRequest = {
    model: {
      draw: page,
      start: (page - 1) * pageSize,
      length: pageSize,
      search: {
        value: '',
        regex: '',
      },
    },
    param: {
      CategoryGroupID: 0,
    },
  }
  return categoryGroupServerSearch(payload)
}

export const getCategoryGroupSelectList = async (): Promise<CategoryGroupSelectItem[]> => {
  const response = await axios.get<CategoryGroupSelectItem[]>(
    `${base_url}CategoryGroup/SelectList`
  )
  return response.data
}
