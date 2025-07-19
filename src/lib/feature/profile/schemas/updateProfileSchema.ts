import { z } from 'zod'

export const updateProfileSchema = z.object({
  userName: z
    .string()
    .min(6, 'Minimum number of characters 6')
    .max(30, 'Maximum number of characters 30')
    .regex(/^[a-zA-Z0-9_-]{6,30}$/, 'Username can contain only 0-9, a-z, A-Z, _, -'),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  region: z.string().optional().nullable(), // Хз что, пока поставлю как страну
  aboutMe: z.string().max(200, 'Maximum number of characters 200').optional().nullable(),
  dateOfBirth: z.date().nullable(),
})

export type UpdateProfileFields = z.infer<typeof updateProfileSchema>
