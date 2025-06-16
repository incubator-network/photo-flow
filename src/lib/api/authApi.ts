import { baseApi } from '@/lib/api/baseApi'
import { ForgotPasswordRequest } from '@/lib/api/authApi.types'

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
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    forgotPassword: build.mutation<void, ForgotPasswordRequest>({
      query: body => ({
        url: '/auth/password-recovery',
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
  useLogoutMutation,
  useForgotPasswordMutation,
} = authApi
