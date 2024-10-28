export interface ParamsType {
  items_per_page: number
  page: number
  sort_by_price?: string
  min_price?: number
  max_price?: number
  start_day?: string
  end_day?: string
  brand?: string
  search_to?: string
  search_from?: string
}
