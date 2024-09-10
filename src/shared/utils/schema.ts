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

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password cannot be blank'),
    confirm_password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .nonempty('Confirmation password cannot be blank')
  })
  .refine((data) => data.newPassword === data.confirm_password, {
    message: 'Confirmation password does not match',
    path: ['confirm_password']
  })

export const VerifyCodeSchema = z.object({
  email: z.string().email('Email must be valid'),
  verificationCode: z.string()
})
