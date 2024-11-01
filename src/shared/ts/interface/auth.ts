export interface RegisterReponse {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

export interface LoginResponse {
  user: { id: string; name: string; email: string; role: string }
  access_token: string
  refresh_token: string
}

export interface Account {
  email: string
  password: string
  confirmPassword?: string
  name?: string
  phone?: string
}
