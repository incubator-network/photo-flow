import { baseApi } from '@/lib/baseApi'
import { UserProfileDataResponse } from '@/app/profile/[id]/page'

type AvatarType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

type ProfileType = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  createdAt: string
  avatars: AvatarType[]
}

type UserPostsResponse = {
  totalCount: number
  pageSize: number
  items: [
    {
      id: number
      userName: string
      description: string
      location: null
      images: [
        {
          url: string
          width: number
          height: number
          fileSize: number
          createdAt: string
          uploadId: string
        },
      ]
      createdAt: string
      updatedAt: string
      avatarOwner: string
      ownerId: number
      owner: {
        firstName: string
        lastName: string
      }
      likesCount: number
      isLiked: false
      avatarWhoLikes: []
    },
  ]
  totalUsers: number
}

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
      serializeQueryArgs: ({ endpointName }) => endpointName,
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

export const { useLazyGetProfileQuery, useGetUserPostsQuery } = profileApi
