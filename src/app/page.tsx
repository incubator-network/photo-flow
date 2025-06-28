import PublicPosts from '@/lib/feature/publicPage/ui/components/PublicPosts/PublicPosts'
import { UsersCounter } from '@/lib/feature/publicPage/ui'

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/all?pageSize=4`, {
    cache: 'no-store',
  })
  const publicPosts = await res.json()
  console.log(typeof publicPosts.totalCount, publicPosts)
  return (
    <div className={'flex flex-col items-center'}>
      <UsersCounter totalCount={publicPosts.totalCount} />
      <PublicPosts publicPosts={publicPosts} />
    </div>
  )
}

// 'use client'
//
// import { useRouter } from 'next/navigation'
// import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
// import { useEffect } from 'react'
//
// export default function Home() {
//   const router = useRouter()
//
//   const { error, isLoading } = useGetMeQuery()
//
//   useEffect(() => {
//     if (error && 'status' in error && error.status === 401) {
//       router.push('/auth/sign-in')
//     }
//   }, [error, router])
//
//   if (isLoading) return <div>Загрузка...</div>
//   return (
//     <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
//       Hello this a test string
//     </div>
//   )
// }
