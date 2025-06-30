import { baseApi } from '@/lib/baseApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    removePost: build.mutation<void, number>({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useRemovePostMutation } = postApi
