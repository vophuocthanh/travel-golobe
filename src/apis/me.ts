import axiosClient from '@/apis/axios-client'
import { ListResponse, MeResponse, UpdateAccountPayload, UserParams, UserResponse } from '@/shared/ts/interface'

export const meApi = {
  getMe(): Promise<MeResponse> {
    const url = '/user/me'
    return axiosClient.get(url)
  },

  getAllUsers(page?: number | string, items_per_page?: number | string): Promise<ListResponse<UserResponse>> {
    const url = '/user'

    if (page === undefined && items_per_page === undefined) {
      return axiosClient.get(url)
    }

    const params: UserParams = {
      items_per_page: items_per_page ? Number(items_per_page) : undefined,
      page: page ? Number(page) : undefined
    }

    return axiosClient.get(url, { params })
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
