import { z } from 'zod'

export const createNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\/-]+$/,
        'Password can only contain Latin letters, numbers, and special characters'
      ),
    passwordConfirmation: z.string(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })
  .refine(data => /[A-Z]/.test(data.password), {
    message: 'Password must contain at least one uppercase letter',
    path: ['password'],
  })
  .refine(data => /\d/.test(data.password), {
    message: 'Password must contain at least one number',
    path: ['password'],
  })
  .refine(data => /[!@#$%^&*()_+{}\[\]:;<>,.?~\/-]/.test(data.password), {
    message: 'Password must contain at least one special character',
    path: ['password'],
  })

export type NewPasswordFields = z.infer<typeof createNewPasswordSchema>
