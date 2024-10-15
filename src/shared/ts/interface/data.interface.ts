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
  id?: string
  name?: string
  userId: string
  description: string
  price: number
  quantity?: number
  count?: string
  suitable_subject?: string
  vchouer?: string
  time_out?: string
  transport?: string
  hotel?: string
  created_at?: string
  updated_at?: string
  original_price: string
  createAt: string
  updateAt: string
  start_date: string
  end_date: string
  starting_gate: string
  sight_seeing: string
  cuisine: string
  ideal_time: string
  image: string
  image_2: string
  image_3: string
  image_4: string
  image_5: string
  isFavorite: boolean
  suitable: string
  road_vehicle: string
  voucher: string
  time_trip: string
  baby_price: number
  child_price: number
  adult_price: number
  rating: string
  number_of_seats_remaining: number
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
  start_day?:string
  end_day?:string
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
export interface FlightBillingResponseType{
  id?: string
  tourId?: string
  userId?: string
  flightCrawlId?: string | null
  hotelCrawlId?: string | null
  roadVehicleId?: string | null
  flightQuantity?: number | null
  hotelQuantity?: number | null
  tourQuantity?: number | null
  roadVehicleQuantity?: number | null
  flightPrice: number | null
  hotelPrice: number | null
  tourPrice: number | null
  roadVehiclePrice: number | null
  roomId?: string | null
  ticketFlighttId?: string | null
  totalAmount: number
  createdAt?: string
  status?: []
  confirmationTime?: string  | null
  isFavorite?: boolean
}