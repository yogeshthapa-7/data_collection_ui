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

export interface CategoryGroupServerSearchParam {
  CategoryGroupID: number
}

export interface CategoryGroupServerSearchRequest {
  model: CategoryServerSearchModel
  param: CategoryGroupServerSearchParam
}

export interface CategoryItem {
  SN?: number
  CategoryID: number
  CategoryGroupID?: number
  CategoryName: string
  CategoryCode?: string
  Icon?: string
  DbTableName?: string
  MapIconColor?: string
  OrderKey?: number
  ExpiryDate?: string
  CategoryGroupName?: string
  CategoryGroupCode?: string
  PublicFormSubTitle?: string
  PublicFormTitle?: string
  Description?: string
  Status?: boolean
  CreatedAt?: string
}

export interface CategoryGroupItem {
  CategoryGroupID: number
  GroupName: string
  GroupCode?: string
  Icon?: string
  Description?: string
  OrderKey?: number
}

export interface CategoryServerSearchResponse {
  data: CategoryItem[]
  recordsTotal: number
  recordsFiltered: number
  draw: number
}

export interface CategoryGroupServerSearchResponse {
  data: CategoryGroupItem[]
  recordsTotal: number
  recordsFiltered: number
  draw: number
}
