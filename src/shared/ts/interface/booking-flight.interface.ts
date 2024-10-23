/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookingResponse {
  bookingId: string
  flightId: string
  id: string
  brand: string
  price: number | null
  start_time: string
  start_day: string
  end_day: string
  end_time: string
  trip_time: string
  take_place: string
  destination: string
  trip_to: string
  createAt: string
  totalAmount:number
  updateAt: string
  userId: string | null
  image: string | null
  number_of_seats_remaining: number
  type_ticket: string
  baggage_weight: string
  invoice: any[]
  flightCrawls:FlightCrawls
  user:UserFlight
}
export interface UserFlight{
  id:string
  avatar:string
  name:string
}
export interface  FlightCrawls {
  id: string;
  brand: string;
  price: number;
  start_time: string;
  start_day: string;
  end_day: string;
  end_time: string;
  trip_time: string;
  take_place: string;
  destination: string;
  trip_to: string;
  createAt: string;
  updateAt: string;
  userId: string | null;
  image: string;
  number_of_seats_remaining: number;
  type_ticket: string;
  baggage_weight: string;
}


export type FlightAdmin = {
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
  createdAt: string
  status: 'PENDING' | 'PROCESING' | 'CANCELLED'
  confirmationTime: string | null
  
}

