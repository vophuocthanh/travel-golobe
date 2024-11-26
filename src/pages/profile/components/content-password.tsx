import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Plus, SquarePen } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authApi } from '@/apis/auth.api'
import { IconEye, IconNonEye } from '@/common/icons'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PropProfile } from '@/shared/ts/types/profile.type'
import { ChangePasswordSchema } from '@/shared/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ContentPassword({ title, content, boolean }: PropProfile) {
  const [open, setOpen] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isCurrentPassword, setCurrentPassword] = useState<boolean>(false)
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: '',
      password: '',
      confirm_password: ''
    }
  })

  const mutationChangePassword = useMutation({
    mutationKey: ['change-password'],
    mutationFn: (data: z.infer<typeof ChangePasswordSchema>) =>
      authApi.changePassword(data.current_password, data.password, data.confirm_password),
    onSuccess: () => {
      toast.success('Password changed successfully!')
      form.reset()
      setOpen(false)
    },
    onError: () => {
      toast.error('Password change failed!')
    }
  })

  function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    mutationChangePassword.mutate(data)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const toggleCurrentPassword = () => {
    setCurrentPassword(!isCurrentPassword)
  }

  const toggleConfirmPassword = () => {
    setIsConfirmPassword(!isConfirmPassword)
  }

  return (
    <>
      <div className='relative items-center justify-between p-2'>
        <label htmlFor='' className='text-base font-normal'>
          {title}
        </label>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>{content}</p>
          <div className='flex space-x-2'>
            {boolean ? (
              <Button className='flex items-center p-2 space-x-2 text-sm bg-white border rounded-md shadow-md border-primary'>
                <Plus className='w-4 h-4' />
                <p>Add another email</p>
              </Button>
            ) : null}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='flex items-center p-2 space-x-2 text-sm text-black bg-white border rounded-md shadow-md hover:text-white border-primary'>
                  <SquarePen className='w-4 h-4' />
                  <p>Change</p>
                </Button>
              </DialogTrigger>
              <DialogContent className='w-[85%] lg:w-full rounded-3xl'>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
                    <FormField
                      control={form.control}
                      name='current_password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Nhập mật khẩu cũ'
                              type={isCurrentPassword ? 'text' : 'password'}
                              {...field}
                              icon={isCurrentPassword ? <IconNonEye /> : <IconEye />}
                              iconOnClick={toggleCurrentPassword}
                            />
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
                              placeholder='Nhập mật khẩu mới'
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
                              placeholder='Nhập lại mật khẩu mới'
                              type={isConfirmPassword ? 'text' : 'password'}
                              {...field}
                              icon={isConfirmPassword ? <IconNonEye /> : <IconEye />}
                              iconOnClick={toggleConfirmPassword}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' className='flex ml-auto text-white'>
                      Submit
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}
