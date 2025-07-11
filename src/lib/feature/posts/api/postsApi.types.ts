import { useUpdatePostMutation } from './postsApi'

export type Images = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type Owner = {
  firstName: string
  lastName: string
}

export type PostResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: Images[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string[]
}
export type UserPostsResponse = {
  totalCount: number
  pageSize: number
  items: PostResponse[]
  totalUsers: number
}
export type Avatars = Omit<Images, 'uploadId'>

export type Author = {
  id: number
  username: string
  avatars: Avatars[]
}

export type Comment = {
  id: number
  postId: number
  from: Author
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type getPostInformation<T> = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: T
}

export type Answer = {
  id: number
  commentId: number
  from: Author
  content: string
  createdAt: string
  likeCount: number
  isLiked: boolean
}

export type getCommentAnswerBody = {
  postId: number
  commentId: number
}

export type UpdatePostMutation = ReturnType<typeof useUpdatePostMutation>
export type ChildMetadata = {
  uploadId: string
}

export type AddPostRequest = {
  description: string
  childrenMetadata: ChildMetadata[]
}
