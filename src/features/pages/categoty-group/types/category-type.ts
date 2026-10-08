export interface CategoryGroupServerSearchParam {
  CategoryGroupID: number
}

export interface CategoryGroupServerSearchRequest {
  model: CategoryServerSearchModel
  param: CategoryGroupServerSearchParam
}

export interface CategoryGroupItem {
  CategoryGroupID: number
  GroupName: string
  GroupCode?: string
  Icon?: string
  Description?: string
  OrderKey?: number
}

export interface CategoryGroupServerSearchResponse {
  data: CategoryGroupItem[]
  recordsTotal: number
  recordsFiltered: number
  draw: number
}