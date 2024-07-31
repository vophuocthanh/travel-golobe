import axiosClient, { LoginResponse } from '@/apis/axios-client'
import { Account } from '@/redux/auth-saga'
import { RegisterReponse } from '@/ts/interface'

export const authApi = {
  login(params: Account): Promise<LoginResponse> {
    const url = '/auth/login'
    return axiosClient.post(url, params)
  },
  register(params: Account): Promise<RegisterReponse> {
    const url = '/auth/register'
    return axiosClient.post(url, params)
  },
  forgot_password(email: string) {
    const url = '/auth/forgot-password'
    return axiosClient.post(url, { email })
  },
  reset_password(password: string, confirm_password: string, token: string) {
    const url = '/auth/reset-password'
    return axiosClient.post(url, { password, token, confirm_password })
  }
}
