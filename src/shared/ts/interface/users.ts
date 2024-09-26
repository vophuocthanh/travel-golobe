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

interface Role {
  name: string
}

export interface UserResponse {
  id?: string
  email?: string
  phone?: string | null
  address?: string | null
  avatar?: string
  name?: string
  date_of_birth?: string | null
  country?: string | null
  createAt?: Date
  updateAt?: Date
  verificationCode?: string | null
  verificationCodeExpiresAt?: Date | null
  isVerified?: boolean
  role: Role
}
