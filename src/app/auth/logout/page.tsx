'use client'
import { Button } from '@/components/ui/button/Button'
import { useLogoutMutation } from '@/lib/api/authApi'
import { Typography } from '@/components/ui/typography/Typography'
import { useRouter } from 'next/navigation'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import { useState } from 'react'
import LogoutIcon from '@/assets/icons/logout.svg'

export default function Logout() {
  const [logout] = useLogoutMutation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const logoutHandler = async () => {
    setIsModalOpen(true)
    try {
      await logout().unwrap()
      // localStorage.removeItem('auth-token')
      router.push('/auth/sign-in')
    } catch (error) {
      console.error('logout error', error)
    } finally {
      setIsModalOpen(false)
    }
  }
  return (
    <div>
      <p>header</p>
      <div
        className={'al flex cursor-pointer items-center gap-3'}
        onClick={() => setIsModalOpen(true)}
      >
        <LogoutIcon className={'h-9 w-9'} />
        <Typography variant='regular_text_14'>Log Out</Typography>
      </div>

      <ModalWindow
        modalTitle='Log Out'
        open={isModalOpen}
        className='h-[240px] w-[438px]'
        onClose={() => setIsModalOpen(false)}
      >
        <div className='relative mt-7.5 px-6'>
          <div className='pb-7.5'>
            <Typography variant='regular_text_16'>
              Are you really want to log out of your account
            </Typography>
            <Typography variant={'bold_text_16'}>“Epam@epam.com”?</Typography>
          </div>
          <div className='flex justify-end gap-6'>
            <Button
              variant={'outline'}
              onClick={logoutHandler}
              className='w-24'
            >
              Yes
            </Button>
            <Button onClick={() => setIsModalOpen(false)} className='w-24'>
              No
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}
