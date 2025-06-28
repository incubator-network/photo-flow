'use client'
import { useEffect } from 'react'
import { useGetPublicPostsQuery } from '@/lib/feature/post/api/postApi'
import { UserPostsResponse } from '@/app/profile/[id]/page'
import { formatDistanceToNow } from 'date-fns'
import ImageNotFound from '@/assets/icons/no-image.svg'
import { Typography } from '@/components/ui/typography/Typography'
import Image from 'next/image'

type PropsType = {
  initialPosts: UserPostsResponse
}
const RefreshInterval = 10_000

export default function PublicPosts({ initialPosts }: PropsType) {
  const { data, refetch, isLoading } = useGetPublicPostsQuery(4, {
    skip: !initialPosts,
    pollingInterval: RefreshInterval,
  })
  const publicPosts = data ?? initialPosts
  useEffect(() => {
    const interval = setInterval(() => refetch(), RefreshInterval)
    return () => clearInterval(interval)
  }, [refetch])
  console.log(publicPosts)
  if (isLoading) return <div>Loading...</div>
  return (
    <ul className={'flex flex-row gap-3'}>
      <img src='https://via.placeholder.com/150' alt='test' />
      {publicPosts?.items.map(post => {
        const date = new Date(post.createdAt)
        const resultDate = formatDistanceToNow(date, { addSuffix: true })
        return (
          <li key={post.id}>
            {post.images[0] ? (
              <Image
                width={240}
                height={240}
                className='h-auto max-w-[240px]'
                src={post.images[0]?.url}
                alt={post.description}
              />
            ) : (
              <ImageNotFound className='h-auto w-[240px]' fill={'#5f5f5f'} />
            )}
            <ul className={'flex-start flex items-center pt-[12px]'}>
              {post.avatarOwner ? (
                <Image
                  className={'w-[36px] rounded-2xl'}
                  src={post.avatarOwner}
                  alt={post.userName}
                />
              ) : (
                <ImageNotFound className={'h-[36px] w-[36px] rounded-2xl'} fill={'#5f5f5f'} />
              )}
              <h1 className={'px-[12px]'}>{post.userName}</h1>
            </ul>
            <Typography variant={'regular_text_14'} className={'py-1'}>
              {resultDate}
            </Typography>

            <div className='w-[240px]'>
              <p className={'line-clamp-3 text-sm leading-4 break-words text-gray-300'}>
                {post.description}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
