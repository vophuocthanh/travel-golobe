import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(2, {
    message: 'Email is valid.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: 'Name is valid.'
  }),
  email: z.string().min(2, {
    message: 'Email is valid.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.'
  })
})
