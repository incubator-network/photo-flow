import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_TOKEN } from '@/constants'
import { handleError } from '@/common/utils/handleError'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      credentials: 'include',
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    handleError(api, result)
    return result
  },
  endpoints: () => ({}),
})
