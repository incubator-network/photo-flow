import { Avatars } from '@/lib/feature/posts/api/postsApi.types'

export type ProfileType = {
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
  avatars: Avatars[]
}

export type UserProfileDataResponse = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatars[]
  userMetadata: UserMetadata
  hasPaymentSubscription?: boolean
}

export type UserMetadata = {
  following: number
  followers: number
  publications: number
}
