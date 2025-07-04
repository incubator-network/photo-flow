import { baseApi } from '@/lib/baseApi'
import {
  Answer,
  getCommentAnswerBody,
  getPostInformation,
} from '@/lib/feature/posts/api/postsApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCommentAnswer: build.query<getPostInformation<Answer[]>, getCommentAnswerBody>({
      query: ({ commentId, postId }) => `/posts/${postId}/comments/${commentId}/answers`,
    }),
    removePost: build.mutation<void, number>({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useLazyGetCommentAnswerQuery, useRemovePostMutation } = authApi
