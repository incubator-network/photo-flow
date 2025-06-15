'use client'
import { Button } from '@/components/ui/button/Button'
import { useLogoutMutation } from '@/lib/api/authApi'
import { Typography } from '@/components/ui/typography/Typography'
import { useRouter } from 'next/navigation'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import { useState } from 'react'

export default function Logout() {
  const [logout] = useLogoutMutation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.push('auth/sign-in')
      localStorage.removeItem('auth-token')
    } catch (error) {
      console.error('logout error', error)
    }
  }
  return (
    <div>
      <p>header</p>
      <Button
        variant='text'
        className='text-light-100 font-semibold'
        onClick={logoutHandler}
      >
        <Typography
          variant='medium_text_14'
          className='text-light-100 font-semibold'
        >
          Logout
        </Typography>
      </Button>

      <ModalWindow
        modalTitle='Logout confirmation'
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className='relative mt-7.5 px-6'>
          <div className='flex justify-end gap-4'>
            <Button
              variant='secondary'
              onClick={() => setIsModalOpen(false)}
              className='w-24'
            >
              No
            </Button>
            <Button onClick={logoutHandler} className='w-24'>
              Yes
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}
