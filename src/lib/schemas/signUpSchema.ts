import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(
        /^[a-zA-Z0-9_-]{6,30}$/,
        'Username can contain only 0-9, a-z, A-Z, _, -'
      ),
    email: z
      .string()
      .email('The email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\/-]{6,20}$/,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^_` { | } ~'
      ),
    // проверить наличие чекбокса
    passwordConfirmation: z.string(),
    agreement: z.boolean(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export type RegistrationFields = z.infer<typeof signUpSchema>
