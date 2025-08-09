import HomeIcon from '@/assets/icons/home.svg'
import CreateIcon from '@/assets/icons/create.svg'
import AccountIcon from '@/assets/icons/account.svg'
import MessageIcon from '@/assets/icons/message.svg'
import SearchIcon from '@/assets/icons/search.svg'
import StatisticsIcon from '@/assets/icons/statistics.svg'
import FavoriteIcon from '@/assets/icons/bookmark-outline.svg'
import LogoutIcon from '@/assets/icons/logout.svg'
import { Typography } from '@/components/ui/typography/Typography'
import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'

type PropsMenu = {
  content?: PropsMenuItems
  userId?: number
  logoutHandler?: () => void
  setIsModalOpen: (state: boolean) => void
  isModalOpen: boolean
}

export type PropsMenuItems = {
  title: string
  url: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export function Sidebar({
  content,
  isModalOpen,
  logoutHandler,
  setIsModalOpen,
  userId,
}: PropsMenu) {
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
      url: `/profile/${userId}`,
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

  // if (!isAuth) return null

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
