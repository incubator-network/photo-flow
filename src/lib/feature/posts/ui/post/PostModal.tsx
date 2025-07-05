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
import ClosePicture from '@/assets/icons/close.svg'
import { twMerge } from 'tailwind-merge'
import PostMenu from '@/lib/feature/posts/ui/post/postMenu/PostMenu'
import ConfirmModal from './ConfirmModal/ConfirmModal'

type PropsType = {
  post: getPostResponse
  comments: getPostInformation<Comment[]>
}

export default function PostModal({ post, comments }: PropsType) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isExit, setIsExit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setIsExit(true)
    }
  }

  const showBlock = (value: boolean) => {
    setIsDelete(value)
  }
  return (
    <ModalWindow
      open
      onClose={onCloseHandler}
      className={twMerge(
        'flex h-[565px] w-[972px]',
        isEditMode && 'grid grid-cols-[auto_1fr] grid-rows-[60px_1fr] gap-0'
      )}
    >
      {isEditMode && (
        <div className='bg-dark-300 border-dark-100 col-span-2 row-span-1 flex h-[60px] w-[970px] items-center justify-between rounded-sm border px-6 py-3'>
          <Typography variant='h1'>Edit Post</Typography>
          <ClosePicture
            className={'h-[24px] w-[24px] cursor-pointer fill-white'}
            onClick={() => {
              if (post.description === textValue) {
                setIsEditMode(false)
                setIsExit(false)
                return
              }
              setIsExit(true)
            }}
          />
        </div>
      )}
      <Slider
        images={post.images}
        classname={twMerge('h-full', isEditMode ? 'col-span-1 row-span-1' : 'w-1/2')}
      />
      <div className={twMerge('relative h-full', isEditMode ? 'col-span-1 row-span-1' : 'w-1/2')}>
        <header className={'relative flex items-center gap-3 px-6 py-3'}>
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
                showBlock(!isDelete)
              }}
            />
          )}

          {isDelete && !isEditMode && (
            <PostMenu
              onClose={() => setIsModalOpen(true)}
              onCloseMenu={() => setIsDelete(false)}
              onEditHandler={() => setIsEditMode(true)}
            />
          )}

          <ConfirmModal
            open={isExit}
            setIsModalOpen={setIsExit}
            onClose={() => setIsExit(false)}
            removeEditMode={() => {
              setIsEditMode(false)
              setTextValue(post.description)
            }}
            postId={post.id}
            className='h-[240px] w-[486px]'
            type='exit'
            confirmText='Do you really want to close the edition of the publication? If you close changes won’t be saved'
          />

          <ConfirmModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onClose={() => setIsModalOpen(false)}
            postId={post.id}
            type='delete'
            confirmText='Are you sure you want to delete this post?'
          />
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
            className={twMerge(
              !isEditMode
                ? 'flex h-[396px] w-full flex-col justify-between'
                : 'flex h-[390px] w-full flex-col justify-between'
            )}
          >
            <div className='flex flex-col'>
              <Textarea
                className={'mx-6 box-content block min-h-[120px] w-[433px] p-0'}
                textareaLabel='Add publication descriptions'
                textareaLabelStyles='ml-6'
                value={textValue}
                changeValue={setTextValue}
                maxLength={500}
              ></Textarea>
              <p className='text-light-900 mr-6 ml-auto text-xs leading-[1.33333] font-normal'>
                {textValue.length}/500
              </p>
            </div>

            <Button type='submit' className={'mr-6 mb-6 ml-auto box-content w-[135px]'}>
              Save Changes
            </Button>
          </form>
        )}

        {!isEditMode && <PostFooter post={post} />}
      </div>
    </ModalWindow>
  )
}
