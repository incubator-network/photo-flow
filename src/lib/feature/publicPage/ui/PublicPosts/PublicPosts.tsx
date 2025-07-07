'use client'
import ImageNotFound from '@/assets/icons/no-image.svg'
import { Typography } from '@/components/ui/typography/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { formatTimeAgo } from '@/utils/formatTimeAgo'
import ExpandableText from '@/lib/feature/publicPage/ui/expandableText/ExpandableText'
import { POSTS_ON_MAIN_PAGE } from '@/constants'
import { useGetPublicPostsQuery } from '@/lib/feature/posts/api/postsApi'
import { UserPostsResponse } from '@/lib/feature/posts/api/postsApi.types'

type PropsType = {
  initialPosts: UserPostsResponse
}

export default function PublicPosts({ initialPosts }: PropsType) {
  const { data, isLoading } = useGetPublicPostsQuery(POSTS_ON_MAIN_PAGE, {
    skip: !initialPosts,
    pollingInterval: 60000,
  })
  const publicPosts = data ?? initialPosts

  if (isLoading) return <div>Loading...</div>
  return (
    <div className={'mt-[36px] flex flex-row gap-3'}>
      {publicPosts?.items.map(post => {
        const resultDate = formatTimeAgo(post.createdAt)
        return (
          <div key={post.id}>
            {post.images[0] ? (
              //FIX: Подумать потом куда должен быть редирект
              <Link href={`/profile/${post.ownerId}?postId=${post.id}`}>
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
                  width={36}
                  height={36}
                  className={'w-[36px] rounded-2xl'}
                  src={post.avatarOwner}
                  alt={post.userName}
                />
              ) : (
                <ImageNotFound className={'h-[36px] w-[36px] rounded-2xl'} fill={'#5f5f5f'} />
              )}
              <Typography className={'px-[12px]'} variant={'h3'}>
                {post.userName}
              </Typography>
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
