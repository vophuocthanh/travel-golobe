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
  image_2: string | null
  image_3: string | null
  image_4: string | null
  image_5: string | null
  rating: number
  number_of_seats_remaining: number | null
  totalAmount: number
  hotelId: string
  flightId: string
  roadVehicleId: string | null
  tour_code: string
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
  start_day?: string
  end_day?: string
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

export interface FlightBillingResponseType {
  id?: string
  flightCrawlId?: string | null
  flightQuantity?: number | null
  flightPrice: number
  ticketFlighttId?: string | null
  totalAmount: number
  createdAt?: string
  status?: []
}
export interface TourBillingResponseType {
  id?: string
  flightCrawlId?: string
  flightQuantity?: number 
  flightPrice?: number
  ticketFlighttId?: string 
  totalAmount?: number
  createdAt?: string
  status?: []
  confirmationTime?: string 
  tour?:Tour
}

export interface Tour {
  id: string;
  name: string;
  userId: string;
  description: string;
  price: number;
  original_price: number | null;
  createAt: string;
  updateAt: string;
  start_date: string;
  end_date: string;
  starting_gate: string | null;
  sight_seeing: string | null;
  cuisine: string | null;
  suitable: string | null;
  ideal_time: string | null;
  road_vehicle: string | null;
  voucher: string | null;
  time_trip: string;
  baby_price: number;
  child_price: number;
  adult_price: number;
  image: string;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  image_5: string | null;
  rating: number;
  number_of_seats_remaining: number;
  totalAmount: number;
  hotelId: string;
  flightId: string;
  roadVehicleId: string | null;
  tour_code: string;
}


export interface BillingResponseType {
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
  confirmationTime?: string | null
  isFavorite?: boolean
}

export interface TourInfoResponse {
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
  road_vehicle: RoadVehicle
  voucher: string | null
  time_trip: string
  baby_price: number
  child_price: number
  adult_price: number
  image: string
  image_2: string | null
  image_3: string | null
  image_4: string | null
  image_5: string | null
  rating: number
  number_of_seats_remaining: number | null
  totalAmount: number
  hotelId: string
  flightId: string
  roadVehicleId: string | null
  tour_code: string
  hotel: Hotel
}

interface RoadVehicle {
  type: string
  details: VehicleDetails
}

interface VehicleDetails {
  id: string
  brand: string
  price: number
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
  image: string
  number_of_seats_remaining: number
  type_ticket: string
  baggage_weight: string
}

interface Hotel {
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
}

export interface HotelAdd {
  hotel_names: string;
  location: string;
  price?: number;
  image: string;
  received_time: string;
  giveback_time: string;
  description?: string;
}

