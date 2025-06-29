'use client'

import { Button } from '@/components/ui/button/Button'
import Link from 'next/link'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'

type Props = {
  id: string
}

export const ProfileSettingsButton = ({ id }: Props) => {
  const { data, isLoading, isFetching, error } = useGetMeQuery()

  if (error || isLoading || isFetching || (data && data.userId !== Number(id))) return <></>

  return (
    <Button asChild className='w-[167px h-[36px]' variant='secondary'>
      <Link href='/'>Profile settings</Link>
    </Button>
  )
}
