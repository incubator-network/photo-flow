'use client'
import { useEffect } from 'react'
import { useGetPublicPostsQuery } from '@/lib/feature/post/api/postApi'
import { UserPostsResponse } from '@/app/profile/[id]/page'
import ImageNotFound from '@/assets/icons/no-image.svg'
import { Typography } from '@/components/ui/typography/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { formatTimeAgo } from '@/utils/formatTimeAgo'
import ExpandableText from '@/components/ui/expandableText/ExpandableText'

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

  if (isLoading) return <div>Loading...</div>
  return (
    <div className={'mt-[36px] flex flex-row gap-3'}>
      {publicPosts?.items.map(post => {
        const resultDate = formatTimeAgo(post.createdAt)
        return (
          <div key={post.id}>
            {post.images[0] ? (
              <Link href={`/posts/${post.id}`}>
                <Image
                  width={240}
                  height={240}
                  className='h-auto max-w-[240px]'
                  src={post.images[0]?.url}
                  alt={post.description}
                />
              </Link>
            ) : (
              <ImageNotFound className='h-auto w-[240px]' fill={'#5f5f5f'} />
            )}
            <div className={'flex-start flex items-center pt-[12px]'}>
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
            </div>
            <Typography variant={'small_text'} className={'py-1'}>
              {resultDate}
            </Typography>
            <div className='w-[240px]'>
              <ExpandableText className={'leading-4 text-gray-300'} text={post.description} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
