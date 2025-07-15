import { twMerge } from 'tailwind-merge'
import { Typography } from '../typography/Typography'
import Close from '@/assets/icons/close.svg'
import { AlertData } from './AlertTypes'

// 'use client'
export const Alert = ({ message, type }: AlertData) => {
  return (
    <div
      className={twMerge(
        'bg-success-900 border-success-500 fixed bottom-5 left-5 z-1000 flex w-[387px] justify-between border px-6 py-3',
        type === 'error' && 'bg-danger-900 border-danger-500'
      )}
    >
      <Typography>
        {type === 'error' && <span className='font-bold'>Error! </span>}
        {message}
      </Typography>
      <Close className='fill-light-100 h-6 w-6' />
    </div>
  )
}
