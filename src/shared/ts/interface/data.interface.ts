export interface HotelResponseType {
  id: string,
  hotel_names?: string,
  location?: string,
  price?: number,
  score_hotels?: string | number,
  number_rating?: string | number,
  star_number?: number,
  received_time?: string,
  giveback_time?: string,
  description?: string,
  hotel_link?: string,
  place?: string,
  image?: string,
  image_2?: string,
  image_3?: string,
  image_4?: string,
  image_5?: string            
}
export interface TourResponseType {
  name: string
  id?: string
  image: string
  description: string
  location: string
  price: number
  quantity?: number
  count?: string
  cuisine?: string
  suitable_subject?: string
  vchouer?: string
  time_out?: string
  ideal_time?: string
  image_2?: string
  image_3?: string
  image_4?: string
  image_5?: string
  transport?: string
  hotel?: string
  starting_gate?: string
  sight_seeing?: string
  created_at?: string
  updated_at?: string
  tourFavorites?:[{isFavorite: boolean}]
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
}
