import axiosClient from '@/apis/axios-client'
import { BillingResponseType } from '@/shared/ts/interface/data.interface'
import { ListResponse } from '@/shared/ts/interface'
import { ParamsType } from '@/shared/ts/interface/params-type-billing'


export const billingApi = {
  getAll(
    page: number | string, items_per_page: number | string, status?: string, userId?: string, 
    tourId?: string, roadVehicleId?: string, min_total_amount?: number, max_total_amount?: number, 
    start_day?: string, end_day?: string   ): Promise<ListResponse<BillingResponseType>> {
    const url = '/bookings'
    const params: ParamsType = {
      page: Number(page),
      items_per_page: Number(items_per_page),
    }
    if (status) params.status = String(status);
    if (userId) params.userId = String(userId);
    if (tourId) params.tourId = String(tourId);
    if (roadVehicleId) params.roadVehicleId = String(roadVehicleId);
    if (min_total_amount) params.min_total_amount = min_total_amount;
    if (max_total_amount) params.max_total_amount = max_total_amount;
    if (start_day && end_day) {
      params.start_day = String(start_day)
      params.end_day = String(end_day)
    }

    return axiosClient.get(url, { params })
    },
}