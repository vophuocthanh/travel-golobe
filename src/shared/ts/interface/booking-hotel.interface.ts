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
  checkInDate: string,
  checkOutDate: string,
  place: string
  image: string | undefined
  image_2: string | null
  image_3: string | null
  image_4: string | null
  image_5: string | null
  userId: string | null
  number_of_seats_remaining: number
  hotelQuantity: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  user:UserBookingHotel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoice: any[]
}

type UserBookingHotel={
  id: string,
  name: string
  avatar:string
}

export type PaymentHotel = {
  id: string;
  tourId: string | null;
  userId: string;
  flightCrawlId: string | null;
  hotelCrawlId: string;
  roadVehicleId: string | null;
  flightQuantity: number | null;
  hotelQuantity: number;
  tourQuantity: number | null;
  roadVehicleQuantity: number | null;
  flightPrice: number | null;
  hotelPrice: number | null;
  tourPrice: number | null;
  roadVehiclePrice: number | null;
  roomId: string;
  ticketFlightId: string | null;
  totalAmount: number;
  createdAt: string;
  status: string;
  confirmationTime: string | null;

};