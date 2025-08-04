'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import HomeIcon from '../icons/home.svg'
import CreateIcon from '../icons/create.svg'
import AccountIcon from '../icons/account.svg'
import MessageIcon from '../icons/message.svg'
import SearchIcon from '../icons/search.svg'
import StatisticsIcon from '../icons/statistics.svg'
import FavoriteIcon from '../icons/bookmark-outline.svg'
import LogoutIcon from '../icons/logout.svg'
import { Typography } from '../Typography'
import Link from 'next/link'
import { Button } from '../Button'
import { ModalWindow } from '../ModalWindow'
export const Sidebar = ({
  content,
  isAuth,
  meData,
  getProfileId,
  logoutHandler,
  isModalOpen,
  setIsModalOpen,
}) => {
  const mainMenuItems = [
    {
      title: 'Feed',
      url: '/',
      icon: HomeIcon,
    },
    {
      title: 'Create',
      url: '#',
      icon: CreateIcon,
    },
    {
      title: 'My Profile',
      url: `/profile/${getProfileId(meData)}`,
      icon: AccountIcon,
    },
    {
      title: 'Messenger',
      url: '#',
      icon: MessageIcon,
    },
    {
      title: 'Search',
      url: '#',
      icon: SearchIcon,
    },
    ...(content ? [content] : []),
  ]
  const secondaryMenuItems = [
    {
      title: 'Statistics',
      url: '#',
      icon: StatisticsIcon,
    },
    {
      title: 'Favorites',
      url: '#',
      icon: FavoriteIcon,
    },
  ]
  if (!isAuth) return null
  return _jsx('div', {
    className: 'border-dark-300 fixed h-full w-[220px] flex-col border-r',
    children: _jsxs('nav', {
      className: 'flex flex-col justify-center pt-33 pb-9 pl-[60px]',
      children: [
        _jsx('ul', {
          className: 'flex-col gap-6 pb-15',
          children: mainMenuItems.map(item =>
            _jsx(
              'li',
              {
                className: 'pb-[24px] last:pb-0',
                children: _jsxs(Link, {
                  className: 'hover:text-accent-500 flex items-center gap-[15px]',
                  href: item.url,
                  children: [
                    _jsx(item.icon, {}),
                    _jsx(Typography, { variant: 'bold_text_14', children: item.title }),
                  ],
                }),
              },
              item.title
            )
          ),
        }),
        _jsx('ul', {
          className: 'flex-col gap-6 pb-[160px]',
          children: secondaryMenuItems.map(item =>
            _jsx(
              'li',
              {
                className: 'pb-[24px] last:pb-0',
                children: _jsxs(Link, {
                  className: 'hover:text-accent-500 flex items-center gap-[15px]',
                  href: item.url,
                  children: [
                    _jsx(item.icon, {}),
                    _jsx(Typography, { variant: 'bold_text_14', children: item.title }),
                  ],
                }),
              },
              item.title
            )
          ),
        }),
        _jsxs(Button, {
          variant: 'text',
          className:
            'hover:text-accent-500 text-light-100 flex items-center justify-start gap-[15px] p-0',
          onClick: () => setIsModalOpen(true),
          children: [
            _jsx(LogoutIcon, {}),
            _jsx(Typography, { variant: 'bold_text_14', children: 'Log Out' }),
          ],
        }),
        _jsx(ModalWindow, {
          modalTitle: 'Log Out',
          open: isModalOpen,
          className: 'h-[240px] w-[438px]',
          onClose: () => setIsModalOpen(false),
          children: _jsxs('div', {
            className: 'relative mt-7.5 px-6',
            children: [
              _jsxs('div', {
                className: 'pb-7.5',
                children: [
                  _jsx(Typography, {
                    variant: 'regular_text_16',
                    children: 'Are you really want to log out of your account',
                  }),
                  _jsx(Typography, {
                    variant: 'bold_text_16',
                    children: '\u201CEpam@epam.com\u201D?',
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'flex justify-end gap-6',
                children: [
                  _jsx(Button, {
                    variant: 'outline',
                    onClick: logoutHandler,
                    className: 'w-24',
                    children: 'Yes',
                  }),
                  _jsx(Button, {
                    onClick: () => setIsModalOpen(false),
                    className: 'w-24',
                    children: 'No',
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  })
}
