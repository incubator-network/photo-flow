'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GitHubCallbackFinalPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('accessToken')
    const email = searchParams.get('email')

    if (token) {
      localStorage.setItem('access_token', token)
      console.log('✅ GitHub login complete:', email)

      router.replace('/')
    } else {
      console.warn('❌ Нет accessToken в URL')
    }
  }, [searchParams, router])

  return <p>Завершаем вход через GitHub...</p>
}
