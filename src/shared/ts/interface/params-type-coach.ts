export interface ParamsType {
  page: number;
  items_per_page: number;
  sort_by_price?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  start_day?: string;
  end_day?: string;
  search_to?: string
  search_from?: string
}
