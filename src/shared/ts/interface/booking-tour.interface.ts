/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentResponse {
  paymentUrl: {
    partnerCode: string
    orderId: string
    amount: number
    requestId: string
    paymentUrl: string
  }
}

export interface AddBookingResponse {
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
  createdAt: string // ISO date string
  status: string // Possible status values
  confirmationTime: string | null // ISO date string or null
}

export interface TourBookingDetail {
  bookingId: string
  tourId: string
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
  number_of_seats_remaining: number
  totalAmount: number
  hotelId: string
  flightId: string
  roadVehicleId: string | null
  tour_code: string
  originalTourPrice: number
  tourQuantity: number
  flightQuantity: number | null
  hotelQuantity: number | null
  status: string
  hotelDetails: HotelDetails
  user: UserTourDetail
  invoice: any[]
}

export interface UserTourDetail {
  id: string
  name: string
  avatar: string
}
export interface HotelDetails {
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
  image: string | null
  image_2: string | null
  image_3: string | null
  image_4: string | null
  image_5: string | null
  userId: string | null
  number_of_seats_remaining: number
}
export interface RoadVehicle {
  type: string
  details: {
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
}
