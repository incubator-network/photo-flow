import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('The email must match the format example@example.com'),
  password: z
    .string()
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\/-]+$/,
      'Password can only contain Latin letters, numbers, and special characters'
    )
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(val => /\d/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine(val => /[!@#$%^&*()_+{}\[\]:;<>,.?~\/-]/.test(val), {
      message: 'Password must contain at least one special character',
    }),
})

export type LoginFields = z.infer<typeof signInSchema>
