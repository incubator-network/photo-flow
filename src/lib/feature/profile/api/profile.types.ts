import { Avatars } from '@/lib/feature/posts/api/postsApi.types'
import { UpdateProfileFields } from '../schemas/updateProfileSchema'

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

export type UpdateProfileError = {
  statusCode: number
  error: string
  messages: { message: string; field: string }[]
}

export type UpdateProfileRequest = Omit<UpdateProfileFields, 'dateOfBirth'> & {
  dateOfBirth: string | null
}
