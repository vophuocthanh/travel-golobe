import { authApi } from '@/apis/auth.api'
import {
  banner_forgot,
  banner_forgot_1,
  banner_forgot_2,
  banner_forgot_3,
  banner_forgot_4,
  logo
} from '@/assets/images'
import { IconEye, IconNonEye } from '@/common/icons'
import CarouselPlugin from '@/components/common/carousel/CarouselPlugin'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ResetPasswordSchema } from '@/shared/utils/schema'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, redirect, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export function Loader() {
  const isAuth = getAccessTokenFromLS()
  if (isAuth) {
    return redirect('/')
  }
  return null
}

export default function ResetPassword() {
  const images = [banner_forgot, banner_forgot_1, banner_forgot_2, banner_forgot_3, banner_forgot_4]
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirm_password: ''
    }
  })

  const onSubmit: SubmitHandler<{ newPassword: string; confirm_password: string }> = async ({
    newPassword,
    confirm_password
  }) => {
    try {
      const token = searchParams.get('access_token')
      if (!token) {
        toast.error('Unable to reset password. Please try again later')
        return
      }
      setIsLoading(true)
      await authApi.reset_password(newPassword, confirm_password, token)
      navigate('/login')
      toast.success('Your password has been reset. Please login with your new password.')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const togglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible)
  }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex items-center justify-between w-full mx-auto my-auto max-w-[90rem]'>
        <div className='flex flex-col w-full space-y-2'>
          <Link to='/' className='w-40'>
            <img src={logo} alt='logo' className='w-40 h-12 mb-10' />
          </Link>
          <Link to='/login' className='w-40'>
            <div className='flex items-center gap-2'>
              <ChevronLeft />
              <span>Back to Login</span>
            </div>
          </Link>
          <h1 className='text-5xl font-semibold'>Forgot your password?</h1>
          <p className='text-sm text-[#112211]'>
            Don’t worry, happens to all of us. Enter your email below to recover your password
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter new password'
                        type={isPasswordVisible ? 'text' : 'password'}
                        {...field}
                        icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={togglePasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirm new password'
                        type={isPasswordConfirmVisible ? 'text' : 'password'}
                        {...field}
                        icon={isPasswordConfirmVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={togglePasswordConfirmVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button loading={isLoading} className='w-full text-white' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className='w-full'>
          <CarouselPlugin images={images} interval={2000}></CarouselPlugin>
        </div>
      </div>
    </div>
  )
}
