'use client'
import { useAppDispatch } from '@/lib/hooks'
import { useLogoutMutation } from '../api/authApi'
import { useRouter } from 'next/navigation'
import { setIsAuth } from '@/lib/appSlice'
import { AUTH_TOKEN } from '@/constants'
import { useState } from 'react'

export const useLogoutHandler = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [logout] = useLogoutMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(setIsAuth({ isAuth: false }))
      localStorage.removeItem(AUTH_TOKEN)
      router.push('/auth/sign-in')
    } catch (error) {
      console.error('logout error', error)
    } finally {
      setIsModalOpen(false)
    }
  }

  return {
    isModalOpen,
    setIsModalOpen,
    logoutHandler: handleLogout,
  }
}
