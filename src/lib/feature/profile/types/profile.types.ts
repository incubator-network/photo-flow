type AvatarType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

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
  avatars: AvatarType[]
}

export type UserProfileDataResponse = {
  id: number
  userName: string
  aboutMe: string
  avatars: [
    {
      url: string
      width: number
      height: number
      fileSize: number
      createdAt: string
    },
  ]
  userMetadata: {
    following: number
    followers: number
    publications: number
  }
  hasPaymentSubscription?: boolean
}

export type PostResponse = {
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
}

export type UserPostsResponse = {
  // postResponse
  totalCount: number
  pageSize: number
  items: PostResponse[]
  totalUsers: number
}
