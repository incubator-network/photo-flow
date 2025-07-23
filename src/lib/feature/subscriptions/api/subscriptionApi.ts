import { baseApi } from '@/lib/baseApi'
import {
  createPaymentRequest,
  getCurrentSubscriptionResponse,
} from '@/lib/feature/subscriptions/api/subscriptionApi.types'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation<{ url: string }, createPaymentRequest>({
      query: body => ({
        url: '/subscriptions',
        method: 'POST',
        body,
      }),
    }),
    getCurrentSubscription: build.query<getCurrentSubscriptionResponse, void>({
      query: () => '/subscriptions/current-payment-subscriptions',
    }),
  }),
})

export const { useCreatePaymentMutation, useGetCurrentSubscriptionQuery } = subscriptionApi
