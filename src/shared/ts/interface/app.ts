export interface ReactWithChild {
  children?: React.ReactNode
}

export type Dictionary<T> = Record<string, T>

export type ValidValue<T> = Exclude<T, null | undefined | 0 | '' | false>

export const BooleanFilter = <T>(x: T): x is ValidValue<T> => Boolean(x)
export type LazyLoadElement = () => Promise<{ default: React.ComponentType }>

export interface RouteLazy {
  path: string
  element: LazyLoadElement
  children?: RouteLazy[]
}

export interface ListResponse<T> {
  data: T[]
  total: number
  page: number
  items_per_page: number
  sort_by_price: string
  min_price: number | undefined
  max_price: number | undefined
  start_day?: string
  end_day?: string
  branch: string
}
export interface HotelParams {
  items_per_page: number
  page: number
  sort_by_price?: string
  min_price?: number | undefined
  max_price?: number | undefined
  star_number?: number | undefined
  search?: string
}
export interface TourParams {
  items_per_page: number
  page: number
  sort_by_price?: string
  min_price?: number
  max_price?: number
  rating?: number | undefined
  search?: string
  start_day?: string
  end_day?: string
  
}
