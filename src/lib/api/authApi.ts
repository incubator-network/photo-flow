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

    googleLogin: build.mutation<
      { accessToken: string; email: string },
      { code: string; redirectUrl: string }
    >({
      query: body => ({
        url: '/api/v1/auth/google/login',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGoogleLoginMutation,
  useRegistrationMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useLogoutMutation,
  useLoginMutation,
} = authApi
