'use client'

import { Typography } from '@/components/ui/typography/Typography'

type Props = {
  title: string
  followers: number
  // variant?: 'followers' | 'following'
}

export const UserMetadata = ({ title, followers }: Props) => {
  // const showFollowers = () => {}
  // const showFollowing = () => {}

  return (
    <div className='cursor-pointer' onClick={() => {}}>
      <Typography variant='bold_text_14'>{followers}</Typography>
      <Typography variant='regular_text_14'>{title}</Typography>
    </div>
  )
}
