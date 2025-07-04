import { UserMetadata } from '@/lib/feature/profile/ui/components/profile/userMetadata/UserMetadata'

type Props = {
  following: number
  followers: number
  postsCount: number
}

export const UserProfileMetadata = ({ following, followers, postsCount }: Props) => {
  return (
    <div className='mt-[19px] flex gap-[88px]'>
      <UserMetadata title={'Following'} metaDataCount={following} />
      <UserMetadata title={'Followers'} metaDataCount={followers} />
      <UserMetadata title={'Publications'} metaDataCount={postsCount} />
    </div>
  )
}
