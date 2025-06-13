import { Button } from '../button/Button'

export const ModalLogout = () => {
  return (
    <Button variant='text' className='text-light-100 font-semibold'>
      <a href='#'>
        Logout
        {/*<LogoutIcon className='h-9 w-9' />*/}
      </a>
    </Button>
  )
}
