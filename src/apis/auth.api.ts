import axiosClient, { LoginResponse } from '@/apis/axios-client'
import { Account } from '@/redux/auth-saga'

export const authApi = {
  login(params: Account): Promise<LoginResponse> {
    const url = '/auth/login/'
    return axiosClient.post(url, params)
  },
  register(params: Account): Promise<LoginResponse> {
    const url = '/auth/register/'
    return axiosClient.post(url, params)
  }
}
