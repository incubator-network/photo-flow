import { baseApi } from '@/lib/baseApi'
import {
  Answer,
  getCommentAnswerBody,
  getPostInformation,
  PostResponse,
  Images,
  AddPostRequest,
  UserPostsResponse,
} from '@/lib/feature/posts/api/postsApi.types'

export const postsApi = baseApi.injectEndpoints({
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
    addPost: build.mutation<PostResponse, AddPostRequest>({
      query: body => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),
    uploadImages: build.mutation<{ images: Images[] }, FormData>({
      query: formData => ({
        url: '/posts/image',
        method: 'POST',
        body: formData,
      }),
    }),
    getPublicPosts: build.query<UserPostsResponse, number>({
      query: pageSize => ({
        url: `/public-posts/all?pageSize=${pageSize}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLazyGetCommentAnswerQuery,
  useRemovePostMutation,
  useGetPublicPostsQuery,

  useUploadImagesMutation,
  useAddPostMutation,
} = postsApi
