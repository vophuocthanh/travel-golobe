export interface ParamsType {
  page: number;
  items_per_page: number;
  status?: string;
  userId?: string;
  tourId?: string;
  roadVehicleId?: string;
  min_total_amount?: number;
  max_total_amount?: number;
  start_day?: string;
  end_day?: string;
}
