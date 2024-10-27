export interface ParamsType {
  page: number;
  items_per_page: number;
  sort_by_price?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  take_place?: string;
  destination?: string;
  start_day?: string;
  end_day?: string;
}
