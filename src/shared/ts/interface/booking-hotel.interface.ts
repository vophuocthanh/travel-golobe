export interface HotelBookingResponse {
  bookingId: string
  hotelId: string
  id: string
  hotel_names: string
  location: string
  price: number
  score_hotels: number
  number_rating: number
  star_number: number
  received_time: string
  giveback_time: string
  description: string
  hotel_link: string
  place: string
  image?: string | null
  image_2?: string | null
  image_3?: string | null
  image_4?: string | null
  image_5?: string | null
  userId?: string | null
  number_of_seats_remaining: number
  hotelQuantity: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoice: any[]
}
