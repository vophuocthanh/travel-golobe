/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookingResponse {
  bookingId: string
  flightId: string
  id: string
  brand: string
  price: number | null
  start_time: string
  start_day: string
  end_day: string
  end_time: string
  trip_time: string
  take_place: string
  destination: string
  trip_to: string
  createAt: string
  updateAt: string
  userId: string | null
  image: string | null
  number_of_seats_remaining: number
  type_ticket: string
  baggage_weight: string
  invoice: any[]
}

export type Payment = {
  id: string
  tourId: string
  userId: string
  flightCrawlId: string
  hotelCrawlId: string
  roadVehicleId: string | null
  flightQuantity: number
  hotelQuantity: number
  tourQuantity: number
  roadVehicleQuantity: number | null
  flightPrice: number
  hotelPrice: number
  tourPrice: number
  roadVehiclePrice: number | null
  roomId: string | null
  ticketFlighttId: string | null
  totalAmount: number
  createdAt: string
  status: 'PENDING' | 'PROCESING' | 'CANCELLED'
  confirmationTime: string | null
  
}
export interface ListResponse<F> {
  data: F[]
  total: number
  currentPage: number
  items_per_page: number

}
export type PaymentListResponse = ListResponse<Payment>;