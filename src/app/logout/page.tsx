'use client'

import { Button } from '@/components/ui/button/Button'
import { router } from 'next/client'
import { useLogoutMutation } from '@/lib/api/authApi'
import { Typography } from '@/components/ui/typography/Typography'

export default function Logout() {
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    await logout()
      .then(res => {
        console.log(res)
        if (res.data) {
          router.push('/sign-in')
          console.log(res, 'Logout successful')
        }
      })
      .catch(error => {
        console.log(error.data.messages)
      })
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
    </div>
  )
}
