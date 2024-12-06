import { z } from 'zod'

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/

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
    .regex(passwordRegex, {
      message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
    })
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
    .regex(passwordRegex, {
      message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
    }),
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

export const NameSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty')
})

export const PhoneSchema = z.object({
  phone: z.string().min(10, 'Invalid phone number')
})

export const AddressSchema = z.object({
  address: z.string().min(1, 'Adress cannot be empty')
})

export const CountrySchema = z.object({
  country: z.string().min(1, 'Country cannot be empty')
})

export const DateOfBirthSchema = z.object({
  date_of_birth: z.string().min(1, 'Date of birth cannot be empty')
})
export const ChangePasswordSchema = z
  .object({
    current_password: z.string().min(1, { message: 'Current password is required' }),
    password: z.string().min(6, { message: 'New password must be at least 6 characters long' }),
    confirm_password: z.string().min(1, { message: 'Confirm password is required' })
  })
  .superRefine((data, ctx) => {
    if (data.confirm_password !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Confirm password does not match password',
        path: ['confirm_password']
      })
    }
  })
