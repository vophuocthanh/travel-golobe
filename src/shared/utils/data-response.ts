export interface DataResponse<T> {
  data: T
  message: string
  status: number
  success: boolean
}

export interface DataListResponse<T> {
  data: T[]
  message: string
  status: number
  success: boolean
}

export const successResponse = <T>(data: T, message: string): DataResponse<T> => ({
  data,
  message,
  status: 200,
  success: true
})

export const successListResponse = <T>(data: T[], message: string): DataListResponse<T> => ({
  data,
  message,
  status: 200,
  success: true
})

export const errorResponse = <T>(data: T, message: string): DataResponse<T> => ({
  data,
  message,
  status: 500,
  success: false
})

export const errorListResponse = <T>(data: T[], message: string): DataListResponse<T> => ({
  data,
  message,
  status: 500,
  success: false
})

export const notFoundResponse = <T>(data: T, message: string): DataResponse<T> => ({
  data,
  message,
  status: 404,
  success: false
})

export const notFoundListResponse = <T>(data: T[], message: string): DataListResponse<T> => ({
  data,
  message,
  status: 404,
  success: false
})

export const badRequestResponse = <T>(data: T, message: string): DataResponse<T> => ({
  data,
  message,
  status: 400,
  success: false
})

export const badRequestListResponse = <T>(data: T[], message: string): DataListResponse<T> => ({
  data,
  message,
  status: 400,
  success: false
})

export const unauthorizedResponse = <T>(data: T, message: string): DataResponse<T> => ({
  data,
  message,
  status: 401,
  success: false
})

export const unauthorizedListResponse = <T>(data: T[], message: string): DataListResponse<T> => ({
  data,
  message,
  status: 401,
  success: false
})

export interface TourResponse {
  id?:string
  name?: string
  image?: string
  description?: string
  price?: number
  cuisine?: string
  suitable?: string
  voucher?: string
  ideal_time?: string
  image_2?: string
  image_3?: string
  image_4?: string
  image_5?: string
  starting_gate?: string
  sight_seeing?: string
  rating?: number
  end_date?: string
  start_date?: string
  time_trip?: string
  baby_price?:number
  child_price?: number
  adult_price?: number
  number_of_seats_remaining?: number
}

export interface TourRequest {
  name: string
  description: string
  image: string
  price: number
  hotelId: string
  flightId: string
  start_date: string
  end_date: string
}
export interface CoachRequest {
  brand: string;        
  price: number;
  number_of_seat: string        
  start_time: string;    
  start_day: string;     
  end_day: string;       
  end_time: string;    
  trip_time: string;    
  take_place: string;   
  destination: string;  
  location: string
  image?: string;
  number_of_seats_remaining: string;  
}
export interface CoachRespone {
  brand: string;                    
  price: number;        
  number_of_seat: string                     
  start_time: string;                 
  start_day: string;                 
  end_day: string;                  
  end_time: string;                 
  trip_time: string;                  
  take_place: string;                 
  destination: string;                
  location: string
  image?: string;                     
  number_of_seats_remaining: number;  
}