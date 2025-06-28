'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography/Typography'
type CounterProps = {
  usersCount: number
}
export const UsersCounter = ({ usersCount }: CounterProps) => {
  const digits = String(usersCount).split('')
  return (
    <div
      className={
        'relative flex items-center justify-between overflow-hidden' +
        'h-[72px] w-[972px] rounded-[2px] px-[24px] py-[12px]'
      }
    >
      <Typography variant={'bold_text_16'}>Registered users:</Typography>
      <div
      // className={s.navbar}
      >
        <div
          className={
            'relative flex h-[48px] w-[203px] content-between items-center overflow-hidden p-3' +
            'rounded-[2px] border-2 border-amber-400'
          }
        >
          {digits.map((digit, index) => (
            <React.Fragment key={index}>
              <div className='text-lg font-bold'>{digit}</div>
              {index !== digits.length - 1 && (
                <div className='mx-[4px] h-[24px] w-[1px] bg-neutral-400 opacity-50' />
              )}
            </React.Fragment>
            // <React.Fragment key={index}>
            //   <div className={'line font-bold'}>{digit}</div>
            //   <div className={'left-0 h-[30px] w-[1px] bg-black leading-7'}>
            //     <div className={'border-b'} />
            //   </div>
            // </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
