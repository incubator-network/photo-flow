import { baseApi } from '@/lib/baseApi'
import {
  ProfileType,
  UpdateProfileError,
  UpdateProfileRequest,
  UserProfileDataResponse,
} from '@/lib/feature/profile/types/profile.types'
import { UserPostsResponse } from '@/lib/feature/posts/api/postsApi.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileType, void>({
      query: () => `/users/profile`,
    }),
    getPublicUserProfile: build.query<UserProfileDataResponse, string>({
      query: profileId => `/public-user/profile/${profileId}`,
    }),
    updateProfile: build.mutation<void | UpdateProfileError, UpdateProfileRequest>({
      query: body => ({
        url: 'users/profile',
        method: 'PUT',
        body,
      }),
    }),
    getUserPosts: build.query<
      UserPostsResponse,
      { userId: string; endCursor: number; pageSize: number }
    >({
      query: ({ userId, endCursor, pageSize }) =>
        `/posts/user/${userId}/${endCursor}?pageSize=${pageSize}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => endpointName + queryArgs.userId,
      merge: (currentCache, newData) => {
        currentCache.items.push(...newData.items)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: 0,
    }),
  }),
})

export const {
  useLazyGetProfileQuery,
  useGetUserPostsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi
