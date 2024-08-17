import { authApi } from '@/apis/auth.api'
import { banner_login, banner_login2, banner_login3, logo } from '@/assets/images'
import { IconEye, IconNonEye } from '@/common/icons'
import CarouselPlugin from '@/components/common/carousel/CarouselPlugin'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/shared/utils/storage'
import { LoginSchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export default function Login() {
  const navigate = useNavigate()
  const images = [banner_login, banner_login2, banner_login3]
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })

  function onSubmit() {
    setIsLoading(true)
    mutationLogin.mutate(form.getValues(), {
      onSuccess: (data) => {
        setAccessTokenToLS(data.access_token)
        setRefreshTokenToLS(data.refresh_token)
        setUserToLS(data.user)
        if (data?.user?.role === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/')
        }
        toast.success('Login success 🚀🚀⚡⚡!')
      },
      onError: () => {
        toast.error('Login failed!')
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex items-center justify-between w-full mx-auto my-auto max-w-[90rem]'>
        <div className='flex flex-col w-full space-y-2'>
          <Link to='/' className='w-40'>
            <img src={logo} alt='logo' className='w-40 h-12 mb-10' />
          </Link>
          <h1 className='text-5xl font-semibold'>Login</h1>
          <p className='text-sm text-[#112211]'>Login to access your Golobe account</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
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
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập password'
                        className='w-full'
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
              <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                  <Checkbox id='terms' className='w-4 h-4' />
                  <Label htmlFor='terms' className='text-base font-normal text-gray-500 cursor-pointer'>
                    Remember me
                  </Label>
                </div>
                <Link to='/forgot-password' className='text-redCustom hover:underline'>
                  Forgot Password
                </Link>
              </div>
              <Button loading={isLoading} className='w-full text-white' type='submit'>
                Login
              </Button>
              <p className='flex items-center justify-center'>
                Don’t have an account?&nbsp;{' '}
                <Link to='/register' className='cursor-pointer text-redCustom hover:underline'>
                  Sign up
                </Link>
              </p>
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
