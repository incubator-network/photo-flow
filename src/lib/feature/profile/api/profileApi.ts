import { baseApi } from '@/lib/baseApi'
import { ProfileType, UserProfileDataResponse } from '@/lib/feature/profile/types/profile.types'
import { Avatars, UserPostsResponse } from '@/lib/feature/posts/api/postsApi.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileType, void>({
      query: () => `/users/profile`,
    }),
    getPublicUserProfile: build.query<UserProfileDataResponse, string>({
      query: profileId => `/public-user/profile/${profileId}`,
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
    updateAvatar: build.mutation<{ avatars: Avatars[] }, FormData>({
      query: formData => ({
        url: '/users/profile/avatar',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const { useLazyGetProfileQuery, useGetUserPostsQuery, useUpdateAvatarMutation } = profileApi
