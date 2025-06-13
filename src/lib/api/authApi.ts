import { baseApi } from '@/lib/api/baseApi'
import { LoginFields } from '../schemas/signInSchema'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    registration: build.mutation<
      void,
      {
        userName: string
        email: string
        password: string
        baseUrl: string
      }
    >({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    confirmEmail: build.mutation<void, { confirmationCode: string }>({
      query: ({ confirmationCode }) => ({
        url: '/auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode },
      }),
    }),
    resendEmail: build.mutation<void, { email: string; baseUrl: string }>({
      query: body => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<{ accessToken: string }, LoginFields>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useLoginMutation,
} = authApi
