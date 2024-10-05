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
