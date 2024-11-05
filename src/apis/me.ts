import axiosClient from '@/apis/axios-client'
import { MeResponse, UpdateAccountPayload, UserResponse } from '@/shared/ts/interface'

export const meApi = {
  getMe(): Promise<MeResponse> {
    const url = '/user/me'
    return axiosClient.get(url)
  },

  getAllUsers() {
    const url = '/user'
    return axiosClient.get(url)
  },

  getUserById(id: string): Promise<UserResponse> {
    const url = `/user/${id}`
    return axiosClient.get(url)
  },

  uploadAvatar(file: File) {
    const url = '/user/upload-avatar'
    const formData = new FormData()
    formData.append('file', file)
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  updateAccount(data: UpdateAccountPayload): Promise<MeResponse> {
    const url = '/user/me'
    return axiosClient.put(url, data)
  },

  deleteUser(id: string) {
    const url = `/user/${id}`
    return axiosClient.delete(url)
  }
}
