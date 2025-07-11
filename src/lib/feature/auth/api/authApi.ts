import { baseApi } from '@/lib/baseApi'
import {
  ForgotPasswordRequest,
  MeResponse,
  ResendEmailRequest,
} from '@/lib/feature/auth/api/authApi.types'
import { LoginFields } from '@/lib/feature/auth/schemas/signInSchema'

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
    resendEmail: build.mutation<void, ResendEmailRequest>({
      query: body => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<{ accessToken: string }, LoginFields>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    googleLogin: build.mutation<
      { accessToken: string; email: string },
      { code: string; redirectUrl: string }
    >({
      query: body => ({
        url: '/auth/google/login',
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
    getMe: build.query<MeResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    forgotPassword: build.mutation<void, ForgotPasswordRequest>({
      query: body => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: build.mutation<void, { newPassword: string; recoveryCode: string | null }>({
      query: body => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
    resendPasswordEmail: build.mutation<void, ResendEmailRequest>({
      query: body => ({
        url: '/auth/password-recovery-resending',
        method: 'POST',
        body,
      }),
    }),
    checkRecoveryCode: build.mutation<{ email: string }, { recoveryCode: string | null }>({
      query: body => ({
        url: '/auth/check-recovery-code',
        method: 'POST',
        body,
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
  useForgotPasswordMutation,
  useLoginMutation,
  useGetMeQuery,
  useCreateNewPasswordMutation,
  useResendPasswordEmailMutation,
  useCheckRecoveryCodeMutation,
} = authApi
