import PublicPosts from '@/lib/feature/publicPage/ui/components/PublicPosts/PublicPosts'
import { UsersCounter } from '@/lib/feature/publicPage/ui'

export default async function HomePage() {
  const postsRaw = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/public-posts/all?pageSize=4`,
    {
      next: { revalidate: 10 },
    }
  )
  const countRaw = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`, {
    next: { revalidate: 10 },
  })
  const publicPosts = await postsRaw.json()
  const usersCount = await countRaw.json()

  return (
    <div className={'flex flex-col items-center'}>
      <UsersCounter usersCount={usersCount.totalCount} />
      <PublicPosts initialPosts={publicPosts} />
    </div>
  )
}
