import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      prepareHeaders: headers => {
        headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('auth-token')}`
        )
      },
    })(args, api, extraOptions)

    return result
  },
  endpoints: () => ({}),
})
