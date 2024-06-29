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
  }
}
