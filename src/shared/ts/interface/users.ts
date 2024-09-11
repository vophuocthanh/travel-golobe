export interface IUser {
  id?: number
  name: string
  email: string
  role: {
    id?: number
    name: string
  }
  created_at?: string
  updated_at?: string
}

export interface MeResponse {
  email?: string
  name?: string
  role?: string
  avatar?: string
  phone?: string
  address: string
  date_of_birth?: string
  country?: string
}
