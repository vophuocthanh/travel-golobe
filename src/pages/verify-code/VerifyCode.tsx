import { authApi } from '@/apis/auth.api'
import {
  banner_forgot,
  banner_forgot_1,
  banner_forgot_2,
  banner_forgot_3,
  banner_forgot_4,
  logo
} from '@/assets/images'
import CarouselPlugin from '@/components/common/carousel/CarouselPlugin'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { VerifyCodeSchema } from '@/shared/utils/schema'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export function Loader() {
  const isAuth = getAccessTokenFromLS()
  if (isAuth) {
    return redirect('/')
  }
  return null
}
export default function VerifyCode() {
  const images = [banner_forgot, banner_forgot_1, banner_forgot_2, banner_forgot_3, banner_forgot_4]
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof VerifyCodeSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      email: 'example@gmail.com',
      verificationCode: ''
    }
  })

  const { handleSubmit } = form

  const mutationVerifyCode = useMutation({
    mutationKey: ['verify-code'],
    mutationFn: (data: z.infer<typeof VerifyCodeSchema>) => authApi.verify_email(data.email, data.verificationCode)
  })

  const onSubmit = () => {
    setIsLoading(true)
    mutationVerifyCode.mutate(form.getValues(), {
      onSuccess: () => {
        toast.success('Authentication successful!')
        navigate('/login')
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>
        const errorMessage = axiosError.response?.data?.message || 'An unknown error occurred.'

        if (axiosError.response?.status === 400) {
          if (errorMessage.includes('invalid')) {
            toast.error('Verification code is incorrect, please try again.')
          } else if (errorMessage.includes('expired')) {
            toast.error('Verification code has expired, please request a new one.')
          } else if (errorMessage.includes('email')) {
            toast.error('The email you entered does not exist.')
          } else {
            toast.error(errorMessage)
          }
        } else {
          toast.error(errorMessage)
        }
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
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
          <h1 className='text-5xl font-semibold'>Verify code</h1>
          <p className='text-sm text-[#112211]'>An authentication code has been sent to your email.</p>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='verificationCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
