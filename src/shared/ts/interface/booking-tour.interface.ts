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
  hotelDetails:HotelDetails
  road_vehicle:RoadVehicle

  
}
export interface HotelDetails {
  id: string; // ID khách sạn
  hotel_names: string; // Tên khách sạn
  location: string; // Địa chỉ
  price: number; // Giá
  score_hotels: number; // Điểm đánh giá khách sạn
}
export interface RoadVehicle {
  type: string; // Loại phương tiện, ví dụ: "Máy bay"
  details: {
    id: string; // ID của phương tiện
    brand: string; // Hãng hàng không, ví dụ: "Vietnam Airlines"
    price: number; // Giá
    startTime: string; // Thời gian khởi hành
    startDay: string; // Ngày khởi hành (ISO date string)
    endDay: string; // Ngày kết thúc (ISO date string)
    endTime: string; // Thời gian kết thúc
    tripTime: string; // Thời gian chuyến đi
    takePlace: string; // Nơi khởi hành
    destination: string; // Điểm đến
    tripTo: string; // Đích đến chuyến đi
    createdAt: string; // Ngày tạo (ISO date string)
    updatedAt: string; // Ngày cập nhật (ISO date string)
    userId: string | null; // ID người dùng hoặc null
    image: string; // URL hình ảnh
    numberOfSeatsRemaining: number; // Số ghế còn lại
    typeTicket: string; // Loại vé, ví dụ: "ECONOMY"
    baggageWeight: string; // Trọng lượng hành lý, ví dụ: "FREE_7KG"
  };
}
