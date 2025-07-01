export type ForgotPasswordRequest = {
  email: string
  recaptcha: string | null
  baseUrl: string
}

export type ResponseError = {
  status: number
  data: {
    error: string
    statusCode: number
    messages: MessagesError[]
  }
}

export type ResendEmailRequest = {
  email: string | null
  baseUrl: string
}

export type MessagesError = {
  message: string
  field: string
}
export type UploadedImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string // ISO string
  uploadId: string
}
export type UploadImagesResponse = {
  images: UploadedImage[]
}
export type AddPostRequest = {
  description: string
  childrenMetadata: { uploadId: string }[]
}

export type AddPostResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
    uploadId: string
  }[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type MeResponse = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}
