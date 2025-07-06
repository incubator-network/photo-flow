'use client'

import { profileApi, useGetUserPostsQuery } from '@/lib/feature/profile/api/profileApi'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import {
  Comment,
  getPostInformation,
  PostResponse,
  UserPostsResponse,
} from '@/lib/feature/posts/api/postsApi.types'
import { PAGE_SIZE } from '@/constants'

type Props = {
  userId: string
  userPostsData: UserPostsResponse
  totalCountPosts: number
}

export type PostData = {
  post: PostResponse
  comments: getPostInformation<Comment[]>
}

export const UserPosts = ({ userId, userPostsData, totalCountPosts }: Props) => {
  const dispatch = useAppDispatch()
  const [endCursor, setEndCursor] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const skipFirstPostsLoadingRef = useRef(true)
  const skipRefetchQueryRef = useRef(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLImageElement | null>(null)

  console.log('userPosts')

  const { data } = useGetUserPostsQuery(
    {
      userId,
      endCursor,
      pageSize: PAGE_SIZE,
    },
    {
      skip: skipFirstPostsLoadingRef.current,
    }
  )

  useEffect(() => {
    if (skipRefetchQueryRef.current) return
    if (userPostsData.items && !data) {
      const thunk = profileApi.util.upsertQueryData(
        'getUserPosts',
        {
          userId,
          endCursor: 0,
          pageSize: PAGE_SIZE,
        },
        userPostsData
      )
      dispatch(thunk)
      skipFirstPostsLoadingRef.current = false
    }
    skipRefetchQueryRef.current = true
  }, [data, dispatch, userId, userPostsData])

  const selectResult = useCallback(
    profileApi.endpoints.getUserPosts.select({
      userId,
      endCursor,
      pageSize: PAGE_SIZE,
    }),
    [userId, endCursor]
  )
  const cache = useSelector<RootState, ReturnType<typeof selectResult>>(state =>
    selectResult(state)
  )

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (!cache.data || totalCountPosts === 0) return
    const target = entries[0]
    if (target.isIntersecting) {
      const lastPostIdFromCache = cache.data.items[cache.data.items.length - 1].id
      if (lastPostIdFromCache !== endCursor && cache.data.items.length < totalCountPosts) {
        setEndCursor(lastPostIdFromCache)
      }
    }
  }

  useEffect(() => {
    const element = lastElementRef.current
    if (!element) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    })
    observer.current.observe(element)
    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [data, handleObserver])

  const posts = data?.items || userPostsData.items

  const handlePost = async (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('postId', id)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex flex-wrap gap-[12px] py-[48px]' id='profilePostsObserver'>
      {posts?.map((item, index) => {
        const isLastElement = index === posts.length - 1
        return (
          <Image
            onClick={() => handlePost(item.id.toString())}
            priority
            ref={isLastElement ? lastElementRef : null}
            key={item.id}
            src={item.images.length ? item.images[0].url : '/no-image.svg'}
            alt={item.id.toString()}
            width={234}
            height={228}
            style={{ aspectRatio: 234 / 228, cursor: 'pointer' }}
          />
        )
      })}
    </div>
  )
}
