'use client'

import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import { Comment, getPostInformation, PostResponse } from '@/lib/feature/posts/api/postsApi.types'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography/Typography'
import Slider from '@/components/ui/slider/Slider'
import PostDescription from '@/lib/feature/posts/ui/post/postDescription/PostDescription'
import PostComment from '@/lib/feature/posts/ui/post/postComment/PostComment'
import PostFooter from '@/lib/feature/posts/ui/post/postFooter/PostFooter'
import Dots from '@/assets/icons/more-horizontal.svg'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'

type PropsType = {
  post: PostResponse
  comments: getPostInformation<Comment[]>
}

export default function PostModal({ post, comments }: PropsType) {
  const router = useRouter()
  const { id } = useParams()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <ModalWindow
      open={!!postId}
      onClose={() => router.replace(`/profile/${id}`)}
      className={'flex h-[565px] w-[972px]'}
    >
      <Slider data={'serverData'} images={post.images} />
      <div className={'relative'}>
        <header className={'flex items-center gap-3 px-6 py-3'}>
          <Image
            width={36}
            height={36}
            src={post.avatarOwner}
            className={'rounded-full'}
            alt={'photo of creator'}
          />
          <Typography variant={'h3'}>{post.userName}</Typography>
          {isAuth && <Dots className={'fill-accent-500 absolute right-6 h-6 w-6 cursor-pointer'} />}
        </header>

        <section
          // нужен ли перенос слов????
          className={`border-dark-100 mb-3 ${isAuth ? 'max-h-[336px]' : 'max-h-[420px]'} w-[480px] overflow-y-auto border-t pt-5 pr-4 pl-6`}
        >
          {post.description && <PostDescription post={post} />}
          {comments &&
            comments.items.map(c => <PostComment key={c.id} postId={post.id} comment={c} />)}
        </section>
        <PostFooter post={post} />
      </div>
    </ModalWindow>
  )
}
