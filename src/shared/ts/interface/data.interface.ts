export interface HotelResponseType {
  id?: string
  name: string
  address: string
  create_at?: string
  update_at?: string
  evaluate?: string
  price: string
  description: string
  images: string
  image_two?: string
  image_three?: string
  image_four?: string
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
  image2?: string
  image3?: string
  image4?: string
  transport?: string
  hotel?: string
  starting_gate?: string
  sight_seeing?: string
  created_at?: string
  updated_at?: string
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
