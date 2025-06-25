'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AUTH_TOKEN } from '@/constants'

export default function GitHubCallbackFinalPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('accessToken')
    const email = searchParams.get('email')

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      console.log('✅ GitHub login complete:', email)

      router.replace('/')
    } else {
      console.warn('❌ Нет accessToken в URL')
    }
  }, [searchParams, router])

  return <p>Завершаем вход через GitHub...</p>
}
