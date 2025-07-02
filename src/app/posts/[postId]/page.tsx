import PostModal from '../../../lib/feature/posts/ui/post/PostModal'

async function getPost(postId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/id/${postId}`)
  if (!res.ok) throw new Error('Post not found')
  return res.json()
}

async function getComments(postId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`)
  return res.json()
}

export default async function PostPage({ params }: { params: { postId: string } }) {
  const { postId } = await params
  const post = await getPost(Number(postId))
  const comments = await getComments(postId)

  return <PostModal post={post} comments={comments} />
}
