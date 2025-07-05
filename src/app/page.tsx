import PublicPosts from '@/lib/feature/publicPage/ui/components/PublicPosts/PublicPosts'
import { UsersCounter } from '@/lib/feature/publicPage/ui'

export default async function HomePage() {
  const POSTS_ON_PAGE = 4
  const postsRaw = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/public-posts/all?pageSize=${POSTS_ON_PAGE}`
  )
  const countRaw = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`)
  const publicPosts = await postsRaw.json()
  const usersCount = await countRaw.json()

  return (
    <div className={'flex flex-col items-center'}>
      <UsersCounter usersCount={usersCount.totalCount} />
      <PublicPosts initialPosts={publicPosts} POSTS_ON_PAGE={POSTS_ON_PAGE} />
    </div>
  )
}
