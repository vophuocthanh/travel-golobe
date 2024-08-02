import axiosClient from '@/apis/axios-client'
import { MeResponse } from '@/shared/ts/interface'

export const meApi = {
  getMe(): Promise<MeResponse> {
    const url = '/user/me'
    return axiosClient.get(url)
  },
  getAllUsers() {
    const url = '/user'
    return axiosClient.get(url)
  }
}
