'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { setIsAuth } from '@/lib/appSlice'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { useRouter } from 'next/navigation'
import { AUTH_TOKEN } from '@/constants'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [shouldFetch, setShouldFetch] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token) {
      setShouldFetch(true)
    } else {
      dispatch(setIsAuth({ isAuth: false }))
    }
  }, [dispatch])

  const { data, error, isLoading } = useGetMeQuery(undefined, {
    skip: !shouldFetch,
  })

  useEffect(() => {
    if (data) {
      dispatch(setIsAuth({ isAuth: true }))
    }

    if (error && 'status' in error && error.status === 401) {
      dispatch(setIsAuth({ isAuth: false }))
      router.replace('/auth/sign-in')
    }
  }, [data, error, dispatch, router])

  // FIX: Добавить нормальный Loader
  if (shouldFetch && isLoading) {
    return <div>Загрузка...</div>
  }

  return children
}
