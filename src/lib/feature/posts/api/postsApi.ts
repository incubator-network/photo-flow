import { baseApi } from '@/lib/baseApi'
import {
  Answer,
  getCommentAnswerBody,
  getPostInformation,
  getPostResponse,
} from '@/lib/feature/posts/api/postsApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCommentAnswer: build.query<getPostInformation<Answer[]>, getCommentAnswerBody>({
      query: ({ commentId, postId }) => `/posts/${postId}/comments/${commentId}/answers`,
    }),
    getPostById: build.query<getPostResponse, number>({
      query: postId => `/posts/id/${postId}`,
    }),
    updatePost: build.mutation<void, { description: string; postId: number }>({
      query: ({ postId, description }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: { description },
      }),
    }),
  }),
})

export const { useLazyGetCommentAnswerQuery, useUpdatePostMutation, useGetPostByIdQuery } = authApi
