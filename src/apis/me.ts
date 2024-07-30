import axiosClient from '@/apis/axios-client'

export const meApi = {
  getMe: () => {
    const url = '/user/me'
    return axiosClient.get(url)
  }
}
