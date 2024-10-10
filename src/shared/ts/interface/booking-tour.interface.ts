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
  createAt: string // ISO date string
  updateAt: string // ISO date string
  start_date: string // ISO date string
  end_date: string // ISO date string
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
  tourQuantity: number
  flightQuantity: number
  hotelQuantity: number
  status: string // Status options
  invoice: any[] // Adjust the type of `invoice` if you have more details
}
