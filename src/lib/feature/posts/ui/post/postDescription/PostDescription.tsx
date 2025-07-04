import Image from 'next/image'
import { Typography } from '@/components/ui/typography/Typography'
import { formatTimeAgo } from '@/utils/formatTimeAgo'
import { getPostResponse } from '@/lib/feature/posts/api/postsApi.types'

function PostDescription({ post }: { post: getPostResponse }) {
  return (
    <div className={'border-dark-100 mb-4 flex gap-3 border-b'}>
      <div className={'h-9 max-w-9'}>
        <Image
          width={36}
          height={36}
          src={post.avatarOwner}
          className={'max-w-9 rounded-full'}
          alt={'photo of creator'}
        />
      </div>
      <div>
        <Typography variant={'regular_text_14'} className={'mb-1'}>
          <Typography variant={'bold_text_14'}>{post.userName}&nbsp;</Typography>
          {post.description}
        </Typography>
        <div className={'mb-1'}>
          <Typography variant={'small_text'} className={'text-light-900 mr-3'}>
            {formatTimeAgo(post.createdAt)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PostDescription
