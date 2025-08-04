'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { memo } from 'react'
import { Select } from '../Select'
import { Button } from '../Button'
import Inctagram from '../icons/Inctagram.svg'
import InctagramForSuperAdmin from '../icons/InctagramForSuperAdmin.svg'
import Notifications from '../icons/Notifications.svg'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
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
export const Header = memo(({ isSuperAdminPanel = false, className, isAuth }) => {
  const notificationsCounter = 3 // получение новых уведомлений с сервера
  const lang = 'English' // язык только eng
  const changeLangHandler = () => {
    // (country: string)
    // логика смены языка. внедряется/не внедряется уточнить.
  }
  const notificationsHandler = () => {
    // отображение уведомлений
  }
  return _jsxs('header', {
    className: twMerge(
      'bg-dark-700 border-dark-300 fixed z-[100] flex h-[60px] w-full items-center justify-between border-b py-[12px]',
      isAuth ? 'pr-[64px] pl-[60px]' : 'px-[60px]',
      className
    ),
    children: [
      isSuperAdminPanel
        ? _jsx(Link, {
            href: '/',
            children: _jsx(InctagramForSuperAdmin, { className: 'h-[36px] w-[198px] fill-white' }),
          })
        : _jsx(Link, {
            href: '/',
            children: _jsx(Inctagram, { className: 'h-[36px] w-[128px] fill-white' }),
          }),
      _jsxs('div', {
        className: twMerge('flex items-center', isAuth ? 'gap-[45px]' : 'gap-[36px]'),
        children: [
          isAuth &&
            !isSuperAdminPanel &&
            _jsxs('div', {
              className: 'relative',
              onClick: notificationsHandler,
              children: [
                notificationsCounter > 0 &&
                  _jsx('div', {
                    className: twMerge(
                      'bg-danger-500 text-w absolute top-[-5px] right-[-5px] flex h-[13px] w-[13px] items-center justify-center rounded-[50%] font-medium',
                      notificationsCounter > 9 ? 'text-[8px]' : 'text-[10px]',
                      'cursor-default'
                    ),
                    children: notificationsCounter,
                  }),
                _jsx(Notifications, { className: 'h-[20px] w-[18px] fill-white' }),
              ],
            }),
          _jsx(Select, {
            items: langVariant,
            className: 'h-[36px] w-[163px]',
            placeholder: 'tut',
            onValueChange: changeLangHandler,
            value: lang,
          }),
          !isAuth &&
            _jsxs('div', {
              className: 'flex gap-[24px]',
              children: [
                _jsx(Button, {
                  variant: 'outline',
                  asChild: true,
                  children: _jsx(Link, { href: '/auth/sign-in', children: 'Log in' }),
                }),
                _jsx(Button, {
                  asChild: true,
                  children: _jsx(Link, { href: '/auth/sign-up', children: 'Sign up' }),
                }),
              ],
            }),
        ],
      }),
    ],
  })
})
Header.displayName = 'Header'
