'use client'

import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import {
  Comment,
  getPostInformation,
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
import { useGetPostByIdQuery, useUpdatePostMutation } from '../../api/postsApi'

type PropsType = {
  postId: number
  comments: getPostInformation<Comment[]>
}

export default function PostModal({ postId, comments }: PropsType) {
  // export default function PostModal({ post, comments }: PropsType) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { data: postData, refetch } = useGetPostByIdQuery(postId)

  console.log(postData)
  const [textValue, setTextValue] = useState<string>('')

  useEffect(() => {
    if (postData?.description) {
      setTextValue(postData.description)
    }
  }, [postData])
  const router = useRouter()

  const isAuth = useAppSelector(selectIsAuth)
  const [updatePost] = useUpdatePostMutation() as UpdatePostMutation
  if (!postData) return null // потом поменять на лоадер. Защита от postData = undefined

  const onCloseHandler = () => {
    if (!isEditMode) {
      console.log('zalupa')
      return router.back()
    }

    if (isEditMode) {
      console.log('открываем модалку')
    }
  }

  return (
    <ModalWindow open onClose={onCloseHandler} className={'flex h-[565px] w-[972px]'}>
      <Slider images={postData.images} />
      <div className={'relative'}>
        <header className={'flex items-center gap-3 px-6 py-3'}>
          <Image
            width={36}
            height={36}
            src={postData.avatarOwner}
            className={'rounded-full'}
            alt={'photo of creator'}
          />
          <Typography variant={'h3'}>{postData.userName}</Typography>
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
            {postData.description && <PostDescription post={postData} />}
            {comments &&
              comments.items.map(c => <PostComment key={c.id} postId={postId} comment={c} />)}
          </section>
        ) : (
          <form
            onSubmit={async e => {
              e.preventDefault()
              await updatePost({ description: textValue, postId })
              await refetch()
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

        {!isEditMode && <PostFooter post={postData} />}
      </div>
    </ModalWindow>
  )
}
