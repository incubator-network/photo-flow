import { baseApi } from '@/lib/baseApi'

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

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileType, void>({
      query: () => `/users/profile`,
    }),
  }),
})

export const { useLazyGetProfileQuery } = profileApi
