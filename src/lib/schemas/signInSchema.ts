import { z } from 'zod'
const specialChars = `!\"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('The email must match the format example@example.com'),
  password: z
    .string()
    .min(6, 'The password must be at least 6 characters long')
    .max(20, 'The password must not exceed 20 characters.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      `Password must contain at least one special character: ${specialChars}`
    ),
})

export type LoginFields = z.infer<typeof signInSchema>
