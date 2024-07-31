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
