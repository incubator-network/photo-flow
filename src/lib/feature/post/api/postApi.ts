import { baseApi } from '@/lib/baseApi'
import { UserPostsResponse } from '@/app/profile/[id]/page'

// console.log('server')
export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicPosts: build.query<UserPostsResponse, number>({
      query: pageSize => ({
        url: `/public-posts/all?pageSize=${pageSize}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetPublicPostsQuery } = authApi
