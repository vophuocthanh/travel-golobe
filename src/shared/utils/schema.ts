import { validator } from '@/shared/lib/validator'
import { z } from 'zod'

export const FormSchemaLogin = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email('Email must be valid'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .regex(validator.password, 'Password must contain at least 6 characters')
})

export const FormSchemaRegister = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email('Email must be valid'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .regex(validator.password, 'Password must contain at least 6 characters'),
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.number().min(1, { message: 'Role is required' })
})

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email('Email must be valid')
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .regex(validator.password, 'Password must contain at least 8 characters, 1 letter, and 1 number'),
  confirm_password: z
    .string()
    .min(1, { message: 'Confirm password is required' })
    .regex(validator.password, 'Password must contain at least 8 characters, 1 letter, and 1 number')
})
