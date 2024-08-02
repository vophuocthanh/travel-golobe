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

export interface FlightResponseType {
  id?: string
  name: string
  description: string
  images: string
  price: string
  startDate: string
  endDate: string
  perios: string
  create_at?: string
  update_at?: string
}
