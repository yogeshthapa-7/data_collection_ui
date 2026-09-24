export interface CategoryServerSearchModel {
  draw: number
  start: number
  length: number
  search: {
    value: string
    regex: boolean
  }
}

export interface CategoryServerSearchParam {
  CategoryID: number
}

export interface CategoryServerSearchRequest {
  model: CategoryServerSearchModel
  param: CategoryServerSearchParam
}

export interface CategoryItem {
  CategoryID: number
  CategoryName: string
  Description?: string
  Status?: boolean
  CreatedAt?: string
}

export interface CategoryServerSearchResponse {
  data: CategoryItem[]
  recordsTotal: number
  recordsFiltered: number
  draw: number
}
