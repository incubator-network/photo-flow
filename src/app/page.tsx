'use client'

import { useRouter } from 'next/navigation'
import { useGetMeQuery } from '@/lib/api/authApi'
import { useEffect, useState } from 'react'
import { PostCreate } from '@/features/features/postCreate/PostCreate'

export default function Home() {
  const router = useRouter()

  const { error, isLoading } = useGetMeQuery()

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      router.push('/auth/sign-up')
    }
  }, [error, router])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (isLoading) return <div>Загрузка...</div>
  return (
    <div>
      <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
        Hello this a test string
      </div>

      <button
        className={'h-50[50px] text-amber-30 m-20 w-[200px] bg-amber-700'}
        onClick={() => {
          setIsOpen(true)
        }}
      >
        addPost Test
        {isOpen && <PostCreate />}
      </button>
    </div>
  )
}
