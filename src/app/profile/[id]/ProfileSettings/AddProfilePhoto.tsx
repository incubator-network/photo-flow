import { Button } from 'photo-flow-ui-kit'
import NoImage from '@/assets/icons/img.svg'

export const AddProfilePhoto = () => {
  return (
    <div className='flex w-[196px] flex-col items-center'>
      <NoImage className={`bg-dark-500 my-6 h-[196px] w-[196px] rounded-full p-[72px]`} />
      <Button variant='outline'>Add a Profile Photo</Button>
    </div>
  )
}
