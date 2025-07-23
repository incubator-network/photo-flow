'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AUTH_TOKEN } from '@/constants'
import { setIsAuth } from '@/lib/appSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'

export default function GitHubCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const token = searchParams.get('accessToken')
    // const email = searchParams.get('email')

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      dispatch(setIsAuth({ isAuth: true }))
      router.replace('/')
    } else {
      console.warn('❌ Нет accessToken в URL')
    }
  }, [searchParams, router, dispatch])

  return null
}
