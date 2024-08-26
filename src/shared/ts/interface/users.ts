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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatar?: any
}
