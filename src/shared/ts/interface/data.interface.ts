export interface HotelResponseType {
  id: string
  hotel_names?: string
  location?: string
  price?: number
  score_hotels?: string | number
  number_rating?: number
  star_number?: number
  received_time?: string
  giveback_time?: string
  description?: string
  hotel_link?: string
  place?: string
  image?: string
  image_2?: string
  image_3?: string
  image_4?: string
  image_5?: string
  isFavorite?: boolean
  rooms?: []
  number_of_seats_remaining?: number
}

export interface TourResponseType {
  id: string
  name: string
  userId: string
  description: string
  price: number
  original_price: number | null
  createAt: string
  updateAt: string
  start_date: string
  end_date: string
  starting_gate: string | null
  sight_seeing: string | null
  cuisine: string | null
  suitable: string | null
  ideal_time: string | null
  road_vehicle: string
  voucher: string | null
  time_trip: string
  baby_price: number
  child_price: number
  adult_price: number
  image: string
  image_2: string
  image_3: string
  image_4: string
  image_5: string
  rating: number
  number_of_seats_remaining: number
  isFavorite: boolean
}

export interface FlightResponseType {
  id?: string
  image?: string
  price: number
  rating?: string
  reviews?: string
  brand?: string
  trip_time?: string
  images?: string
  start_time?: string
  end_time?: string
  trip_to?: string
  take_place?: string
  create_at?: string
  destination?: string
  Ticket?: []
  isFavorite?: boolean
  number_of_seats_remaining: number
}
export interface CoachResponseType {
  id?: string
  image?: string
  brand?: string
  images?: string
  price: number
  number_of_seat?: string
  start_time?: string
  start_day?: string
  end_day?: string
  end_time?: string
  trip_time?: string
  take_place?: string
  destination?: string
  location?: string
  Ticket?: []
  isFavorite?: boolean
  number_of_seats_remaining: number
}
