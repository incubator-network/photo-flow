'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/lib/store'
import { useDispatch } from 'react-redux'
import { useGoogleLoginMutation } from '@/lib/api/authApi'

export default function GoogleCallback() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) return

    const doLogin = async () => {
      try {
        await googleLogin({
          code,
          redirectUrl: 'http://localhost:3000/auth/google/callback',
        }).unwrap()
        router.push('/')
      } catch (err) {
        console.error('❌ Ошибка авторизации через Google', err)
      }
    }
    void doLogin()
  }, [googleLogin, router, dispatch])

  return <p>Завершаем вход через Google...</p>
}
