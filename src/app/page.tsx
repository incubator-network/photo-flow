'use client'

import { useRouter } from 'next/navigation'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  const { error, isLoading } = useGetMeQuery()

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      router.push('/auth/sign-in')
    }
  }, [error, router])

  if (isLoading) return <div>Загрузка...</div>
  return (
    <div style={{ height: '2000px', width: '120%' }}>
      <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
        Hello this a test string
      </div>
    </div>
  )
}
