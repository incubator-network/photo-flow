'use client'

import { memo } from 'react'
import { Select } from '@/components/ui/Select/Select'
import { Button } from '@/components/ui/button/Button'
import Inctagram from '@/assets/icons/Inctagram.svg'
import InctagramForSuperAdmin from '@/assets/icons/InctagramForSuperAdmin.svg'
import Notifications from '@/assets/icons/Notifications.svg'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

type Props = {
  isSuperAdminPanel?: boolean
  isLoggedIn: boolean
  notificationsCounter: number
  notificationsHandler: () => void
  className: string
}

const langVariant = [
  {
    title: 'Russian',
    path: '/Flag-Russia.svg',
  },
  {
    title: 'English',
    path: '/Flag-United-Kingdom.svg',
  },
]

export const Header = memo(
  ({ isSuperAdminPanel = false, isLoggedIn, className }: Props) => {
    const notificationsCounter = 3 // получение новых уведомлений с сервера
    const lang = 'English' // язык только eng

    const changeLangHandler = () => {
      // (country: string)
      // логика смены языка. внедряется/не внедряется уточнить.
    }
    const notificationsHandler = () => {
      // отображение уведомлений
    }

    return (
      <header
        className={twMerge(
          'border-dark-300 mt-[100px] ml-[20px] flex h-[60px] w-[1280px] items-center justify-between border-b py-[12px]',
          isLoggedIn ? 'pr-[64px] pl-[60px]' : 'px-[60px]',
          className
        )}
      >
        {isSuperAdminPanel ? (
          <Link href='/'>
            <InctagramForSuperAdmin
              className={'h-[36px] w-[198px] fill-white'}
            />
          </Link>
        ) : (
          <Link href='/'>
            <Inctagram className={'h-[36px] w-[128px] fill-white'} />
          </Link>
        )}

        <div
          className={twMerge(
            'flex items-center',
            isLoggedIn ? 'gap-[45px]' : 'gap-[36px]'
          )}
        >
          {isLoggedIn && !isSuperAdminPanel && (
            <div className={'relative'} onClick={notificationsHandler}>
              {notificationsCounter > 0 && (
                <div
                  className={twMerge(
                    'bg-danger-500 text-w absolute top-[-5px] right-[-5px] flex h-[13px] w-[13px] items-center justify-center rounded-[50%] font-medium',
                    notificationsCounter > 9 ? 'text-[8px]' : 'text-[10px]',
                    'cursor-default'
                  )}
                >
                  {notificationsCounter}
                </div>
              )}
              <Notifications className={'h-[20px] w-[18px] fill-white'} />
            </div>
          )}
          <Select
            items={langVariant}
            className={'h-[36px] w-[163px]'}
            placeholder={'tut'}
            onValueChange={changeLangHandler}
            value={lang}
          />
          {!isLoggedIn && (
            <div className={'flex gap-[24px]'}>
              <Button variant={'outline'} asChild>
                <Link href={'/login'}>Log in</Link>
              </Button>
              <Button asChild>
                <Link href={'/registration'}>Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>
    )
  }
)

Header.displayName = 'Header'
