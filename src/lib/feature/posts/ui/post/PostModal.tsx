'use client'

import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import {
  Comment,
  getPostInformation,
  getPostResponse,
  UpdatePostMutation,
} from '@/lib/feature/posts/api/postsApi.types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography/Typography'
import Slider from '@/components/ui/slider/Slider'
import PostDescription from '@/lib/feature/posts/ui/post/postDescription/PostDescription'
import PostComment from '@/lib/feature/posts/ui/post/postComment/PostComment'
import PostFooter from '@/lib/feature/posts/ui/post/postFooter/PostFooter'
import Dots from '@/assets/icons/more-horizontal.svg'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { Button } from '@/components/ui/button/Button'
import { useUpdatePostMutation } from '../../api/postsApi'

type PropsType = {
  post: getPostResponse
  comments: getPostInformation<Comment[]>
}

export default function PostModal({ post, comments }: PropsType) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const [textValue, setTextValue] = useState<string>('')

  useEffect(() => {
    if (post?.description) {
      setTextValue(post.description)
    }
  }, [post])
  const router = useRouter()

  const isAuth = useAppSelector(selectIsAuth)
  const [updatePost] = useUpdatePostMutation() as UpdatePostMutation

  const onCloseHandler = () => {
    if (!isEditMode) {
      return router.back()
    }

    if (isEditMode) {
      console.log('открываем модалку')
    }
  }

  return (
    <ModalWindow open onClose={onCloseHandler} className={'flex h-[565px] w-[972px]'}>
      <Slider images={post.images} />
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
          {isAuth && !isEditMode && (
            <Dots
              className={'fill-accent-500 absolute right-6 h-6 w-6 cursor-pointer'}
              onClick={() => {
                setIsEditMode(true)
              }}
            />
          )}
        </header>
        {!isEditMode ? (
          <section
            // нужен ли перенос слов????
            className={`border-dark-100 mb-3 ${isAuth ? 'max-h-[336px]' : 'max-h-[420px]'} w-[480px] overflow-y-auto border-t pt-5 pr-4 pl-6`}
          >
            {post.description && <PostDescription post={{ ...post, description: textValue }} />}
            {comments &&
              comments.items.map(c => <PostComment key={c.id} postId={post.id} comment={c} />)}
          </section>
        ) : (
          <form
            onSubmit={async e => {
              e.preventDefault()
              await updatePost({ description: textValue, postId: post.id })
              setIsEditMode(false)
            }}
            className='flex h-full w-full flex-col justify-between'
          >
            <Textarea
              className={'mx-6 block w-full'}
              textareaLabel='Add publication descriptions'
              value={textValue}
              changeValue={setTextValue}
              maxLength={500}
            ></Textarea>
            <Button type='submit' className={'ml-auto box-content w-[135px]'}>
              Save Changes
            </Button>
          </form>
        )}

        {!isEditMode && <PostFooter post={post} />}
      </div>
    </ModalWindow>
  )
}
