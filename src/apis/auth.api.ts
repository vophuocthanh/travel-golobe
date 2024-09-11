import axiosClient, { LoginResponse } from '@/apis/axios-client'
import { Account } from '@/redux/auth-saga'
import { RegisterReponse } from '@/shared/ts/interface'

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
  reset_password(newPassword: string, confirm_password: string, token: string) {
    const url = '/auth/reset-password'
    return axiosClient.put(
      url,
      { newPassword, token, confirm_password },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  },
  verify_email(email: string, verificationCode: string) {
    const url = '/auth/verify-email'
    return axiosClient.post(url, { email, verificationCode })
  },
  changePassword(current_password: string, password: string, confirm_password: string) {
    const url = '/auth/change-password'
    return axiosClient.put(url, { current_password, password, confirm_password })
  }
}
