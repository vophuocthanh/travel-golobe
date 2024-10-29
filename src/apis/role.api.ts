import axiosClient from '@/apis/axios-client'
import { ListResponse, RoleResponse, UpdateRoleResponse } from '@/shared/ts/interface'

export const roleApi = {
  getRoles(): Promise<ListResponse<RoleResponse>> {
    const url = '/role'
    return axiosClient.get(url)
  },
  updateRole(userId: string, data: UpdateRoleResponse, currentUserId: string) {
    const url = `/user/${userId}/role`
    return axiosClient.put(url, data, { headers: { 'current-user-id': currentUserId } })
  }
}
