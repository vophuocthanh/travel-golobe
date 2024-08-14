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
import { ForgotPasswordSchema } from '@/shared/utils/schema'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, redirect } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export function Loader() {
  const isAuth = getAccessTokenFromLS()
  if (isAuth) {
    return redirect('/')
  }
  return null
}

export default function ForgotPassword() {
  const images = [banner_forgot, banner_forgot_1, banner_forgot_2, banner_forgot_3, banner_forgot_4]
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: 'example@gmail.com'
    }
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordSchema>> = async ({ email }) => {
    try {
      setIsLoading(true)
      await authApi.forgot_password(email)
      toast.success('Your password has been sent to your email! Please check your email')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
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
