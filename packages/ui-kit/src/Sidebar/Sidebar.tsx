'use client'
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

type PropsMenu<T> = {
  content?: PropsMenuItems
  isAuth: boolean
  meData: T
  getProfileId: (data: T) => string
  logoutHandler: () => void
  isModalOpen: boolean
  setIsModalOpen: (v: boolean) => void
}

export type PropsMenuItems = {
  title: string
  url: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Sidebar = <T,>({
  content,
  isAuth,
  meData,
  getProfileId,
  logoutHandler,
  isModalOpen,
  setIsModalOpen,
}: PropsMenu<T>) => {
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

  return (
    <div className={'border-dark-300 fixed h-full w-[220px] flex-col border-r'}>
      <nav className={'flex flex-col justify-center pt-33 pb-9 pl-[60px]'}>
        <ul className={'flex-col gap-6 pb-15'}>
          {mainMenuItems.map(item => (
            <li className={'pb-[24px] last:pb-0'} key={item.title}>
              <Link
                className={'hover:text-accent-500 flex items-center gap-[15px]'}
                href={item.url}
              >
                <item.icon />
                <Typography variant={'bold_text_14'}>{item.title}</Typography>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={'flex-col gap-6 pb-[160px]'}>
          {secondaryMenuItems.map(item => (
            <li key={item.title} className={'pb-[24px] last:pb-0'}>
              <Link
                className={'hover:text-accent-500 flex items-center gap-[15px]'}
                href={item.url}
              >
                <item.icon />
                <Typography variant={'bold_text_14'}>{item.title}</Typography>
              </Link>
            </li>
          ))}
        </ul>
        <Button
          variant={'text'}
          className={
            'hover:text-accent-500 text-light-100 flex items-center justify-start gap-[15px] p-0'
          }
          onClick={() => setIsModalOpen(true)}
        >
          <LogoutIcon />
          <Typography variant='bold_text_14'>Log Out</Typography>
        </Button>

        <ModalWindow
          modalTitle='Log Out'
          open={isModalOpen}
          className='h-[240px] w-[438px]'
          onClose={() => setIsModalOpen(false)}
        >
          <div className='relative mt-7.5 px-6'>
            <div className='pb-7.5'>
              <Typography variant='regular_text_16'>
                Are you really want to log out of your account
              </Typography>
              <Typography variant={'bold_text_16'}>“Epam@epam.com”?</Typography>
            </div>
            <div className='flex justify-end gap-6'>
              <Button variant={'outline'} onClick={logoutHandler} className='w-24'>
                Yes
              </Button>
              <Button onClick={() => setIsModalOpen(false)} className='w-24'>
                No
              </Button>
            </div>
          </div>
        </ModalWindow>
      </nav>
    </div>
  )
}
