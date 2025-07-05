'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography/Typography'

type CounterProps = {
  usersCount: number
}
export const UsersCounter = ({ usersCount }: CounterProps) => {
  const digits = String(usersCount)
  const paddedDigits = digits.length < 6 ? String(digits).padStart(6, '0') : digits
  return (
    <div
      className={
        'mt-[24px] flex items-center justify-between overflow-hidden' +
        ' h-[72px] w-[996px] rounded-[2px] px-[24px] py-[12px]' +
        ' bg-dark-500' +
        ' 1px border-dark-300 border'
      }
    >
      <Typography variant={'bold_text_16'}>Registered users:</Typography>

      <div
        className={
          'h-[48px] w-[203px] ' +
          ' flex items-center justify-between overflow-hidden p-3' +
          ' bg-dark-700 border-dark-300 rounded-[2px] border-[2px]'
        }
      >
        {paddedDigits.split('').map((digit, index) => (
          <React.Fragment key={index}>
            <div className='text-lg font-bold'>{digit}</div>
            {index !== paddedDigits.length - 1 && (
              <div className='mx-[4px] h-[24px] w-[1px] bg-neutral-400 opacity-50' />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
