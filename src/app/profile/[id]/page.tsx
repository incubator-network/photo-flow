import { twMerge } from 'tailwind-merge'
import { Typography } from '@/components/ui/typography/Typography'
import { ProfileSettingsButton } from '@/lib/feature/profile/ui/components/profileSettingsButton/ProileSettingsButton'
import { UserMetadata } from '@/lib/feature/profile/ui/components/userMetadata/UserMetadata'
import { UserPosts } from '@/lib/feature/profile/ui/components/userPosts/UserPosts'
import Image from 'next/image'

// вернуть 404 если нет пользователя или не валидность

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id: userId } = await params // новый синтаксис некста по доке)
  const userProfileData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}public-user/profile/${userId}`,
    { cache: 'no-store' }
  )
  const userProfile: UserProfileDataResponse = await userProfileData.json()

  const userPostsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}posts/user/${userId}/0?pageSize=8`,
    {
      cache: 'no-store',
    }
  )
  const userPosts: UserPostsResponse = await userPostsData.json()
  const totalCountPosts = userPosts.totalCount

  return (
    <div className={twMerge('border-danger-500 m-auto w-[1060px] border pt-[36px] pl-[24px]')}>
      <div className='flex gap-[38px] pr-[64px]'>
        <Image
          priority
          src={
            userProfile?.avatars[0]?.url ||
            'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'
            // костыль иначе падает без url
          }
          alt={userProfile.userName}
          width={204}
          height={204}
          className='h-[204px] w-[204px] rounded-[50%]'
        />
        <div className='w-full'>
          <div className='flex w-full justify-between'>
            <Typography variant={'h1'} className={'capitalize'}>
              {userProfile.userName}
            </Typography>
            <ProfileSettingsButton id={userId} />
          </div>
          <div className='mt-[19px] flex gap-[88px]'>
            <UserMetadata title={'Following'} followers={userProfile.userMetadata.following} />
            <UserMetadata title={'UserMetadata'} followers={userProfile.userMetadata.followers} />
            <UserMetadata title={'Publications'} followers={userPosts.totalCount} />
          </div>
          <Typography variant='regular_text_16' className='mt-[23px]'>
            {userProfile.aboutMe}
          </Typography>
        </div>
      </div>
      <UserPosts userId={userId} userPostsData={userPosts} totalCountPosts={totalCountPosts} />
    </div>
  )
}

type ProfilePageProps = {
  params: {
    id: string
  }
}

export type UserProfileDataResponse = {
  id: number
  userName: string
  aboutMe: string
  avatars: [
    {
      url: string
      width: number
      height: number
      fileSize: number
      createdAt: string
    },
  ]
  userMetadata: {
    following: number
    followers: number
    publications: number
  }
  hasPaymentSubscription?: boolean
}

export type UserPostsResponse = {
  totalCount: number
  pageSize: number
  items: [
    {
      id: number
      userName: string
      description: string
      location: null
      images: [
        {
          url: string
          width: number
          height: number
          fileSize: number
          createdAt: string
          uploadId: string
        },
      ]
      createdAt: string
      updatedAt: string
      avatarOwner: string
      ownerId: number
      owner: {
        firstName: string
        lastName: string
      }
      likesCount: number
      isLiked: false
      avatarWhoLikes: []
    },
  ]
  totalUsers: number
}
