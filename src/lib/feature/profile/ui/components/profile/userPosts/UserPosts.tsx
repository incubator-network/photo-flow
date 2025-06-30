'use client'

import { profileApi, useGetUserPostsQuery } from '@/lib/feature/profile/api/profileApi'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UserPostsResponse } from '@/lib/feature/profile/types/profile.types'

type Props = {
  userId: string
  userPostsData: UserPostsResponse
  totalCountPosts: number
}

export const UserPosts = ({ userId, userPostsData, totalCountPosts }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [pageSize] = useState(8)
  const [endCursor, setEndCursor] = useState(0)
  const skipFirstPostsLoadingRef = useRef(true)
  const skipRefetchQueryRef = useRef(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLImageElement | null>(null)

  const { data } = useGetUserPostsQuery(
    {
      userId,
      endCursor,
      pageSize,
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
          pageSize,
        },
        userPostsData
      )
      dispatch(thunk)
      skipFirstPostsLoadingRef.current = false
    }
    skipRefetchQueryRef.current = true
  }, [])

  const selectResult = profileApi.endpoints.getUserPosts.select({
    userId,
    endCursor,
    pageSize,
  })
  const cache = useSelector<RootState, ReturnType<typeof selectResult>>(state =>
    selectResult(state)
  )

  const loadMore = useCallback(() => {
    if (!cache.data || totalCountPosts === 0) return
    const lastPostIdFromCache = cache.data.items[cache.data.items.length - 1].id
    if (lastPostIdFromCache !== endCursor && cache.data.items.length < totalCountPosts) {
      setEndCursor(lastPostIdFromCache)
    }
  }, [cache.data, endCursor, totalCountPosts])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        loadMore()
      }
    },
    [loadMore]
  )

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

  return (
    <div className='flex flex-wrap gap-[12px] py-[48px]' id='profilePostsObserver'>
      {posts?.map((item, index) => {
        const isLastElement = index === posts.length - 1
        return (
          <Image
            priority
            ref={isLastElement ? lastElementRef : null}
            key={item.id}
            src={item.images[0].url}
            alt={item.id.toString()}
            width={234}
            height={228}
            style={{ aspectRatio: 234 / 228 }}
          />
        )
      })}
    </div>
  )
}
