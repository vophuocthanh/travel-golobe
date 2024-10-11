/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookingCoachResponse {
  bookingId: string
  coachId: string
  id: string
  brand?: string
  price: number | null
  number_of_seat?: number | null
  start_time: string
  start_day: string
  end_day: string
  end_time: string
  trip_time: string
  take_place: string
  destination: string
  location: string
  createAt: string
  updateAt: string
  userId: string | null
  image: string | null
  number_of_seats_remaining: number
  type_ticket: string
  invoice: any[]
}
