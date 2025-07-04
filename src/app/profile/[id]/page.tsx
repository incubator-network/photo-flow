import { twMerge } from 'tailwind-merge'
import { Typography } from '@/components/ui/typography/Typography'
import { UserPosts } from '@/lib/feature/profile/ui/components/profile/userPosts/UserPosts'
import { ProfileControls } from '@/lib/feature/profile/ui/components/profile/profileControls/ProfileControls'
import Image from 'next/image'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'
import {
  UserPostsResponse,
  UserProfileDataResponse,
} from '@/lib/feature/profile/types/profile.types'
import { UserProfileMetadata } from '@/lib/feature/profile/ui/components/profile/userProfileMetadata/UserProfileMetadata'

// вернуть 404 если нет пользователя или не валидность

type ProfilePageProps = {
  params: {
    id: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id: userId } = await params
  try {
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
      <div className={twMerge('m-auto w-[1060px] pt-[36px] pl-[24px]')}>
        <div className='flex gap-[38px] pr-[64px]'>
          <Image
            priority
            src={userProfile?.avatars[0]?.url || DefaultAvatar}
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
              <ProfileControls id={userId} />
            </div>
            <UserProfileMetadata
              following={userProfile.userMetadata.following}
              followers={userProfile.userMetadata.followers}
              postsCount={userPosts.totalCount}
            />
            <Typography variant='regular_text_16' className='mt-[23px]'>
              {userProfile.aboutMe}
            </Typography>
          </div>
        </div>
        <UserPosts
          key={userId}
          userId={userId}
          userPostsData={userPosts}
          totalCountPosts={totalCountPosts}
        />
      </div>
    )
  } catch (e) {
    console.log(e)
    return <h1>Not Found 404 заглушка</h1> // переделать! компонент 404
  }
}
