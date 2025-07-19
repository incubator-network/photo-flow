'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { setIsAuth } from '@/lib/appSlice'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { useRouter } from 'next/navigation'
import { AUTH_TOKEN } from '@/constants'
import { Header } from '@/components/ui/header/Header'
import Loader from '@/components/ui/loader/Loader'
import { Sidebar } from '@/components/ui/sidebar/Sidebar'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [shouldFetch, setShouldFetch] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token) {
      setShouldFetch(true)
    } else {
      dispatch(setIsAuth({ isAuth: false }))
      setIsCheckingAuth(false)
    }
  }, [dispatch])

  const { data, error } = useGetMeQuery(undefined, {
    skip: !shouldFetch,
  })

  useEffect(() => {
    if (data) {
      dispatch(setIsAuth({ isAuth: true }))
      setIsCheckingAuth(false)
    }

    if (error && 'status' in error && error.status === 401) {
      dispatch(setIsAuth({ isAuth: false }))
      router.replace('/auth/sign-in')
    }
  }, [data, error, dispatch, router])

  if (isCheckingAuth) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  )
}
