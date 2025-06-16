'use client'
import { useLogoutMutation } from '@/lib/api/authApi'
import { Button } from '@/components/ui/button/Button'

export default function Logout() {
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    await logout()
      .then(res => {
        console.log(res)
        if (res.data === '204') console.log(res, 'Logout successful')
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
        Logout
      </Button>
    </div>
  )
}
