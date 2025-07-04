'use client'

import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import {
  Comment,
  getPostInformation,
  getPostResponse,
} from '@/lib/feature/posts/api/postsApi.types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography/Typography'
import Slider from '@/components/ui/slider/Slider'
import PostDescription from '@/lib/feature/posts/ui/post/postDescription/PostDescription'
import PostComment from '@/lib/feature/posts/ui/post/postComment/PostComment'
import PostFooter from '@/lib/feature/posts/ui/post/postFooter/PostFooter'
import Dots from '@/assets/icons/more-horizontal.svg'
import Pencil from '@/assets/icons/pencil.svg'
import Basket from '@/assets/icons/basket.svg'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { Button } from '@/components/ui/button/Button'
import { useState } from 'react'
import { useRemovePostMutation } from '@/lib/feature/post/api/postApi'

type PropsType = {
  post: getPostResponse
  comments: getPostInformation<Comment[]>
}

export default function PostModal({ post, comments }: PropsType) {
  const router = useRouter()

  const isAuth = useAppSelector(selectIsAuth)

  const [deletePost] = useRemovePostMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isVisible, setIsVisible] = useState(false)

  const postRemoveHandler = async () => {
    setIsModalOpen(true)
    try {
      await deletePost(post.id).unwrap()
      router.back()
    } catch (error) {
      console.error('The post has not been found', error)
    } finally {
      setIsModalOpen(false)
    }
  }
  const showBlock = (value: boolean) => {
    setIsVisible(value)
  }
  return (
    <ModalWindow open onClose={() => router.back()} className={'flex h-[565px] w-[972px]'}>
      <Slider images={post.images} />
      <div className={'relative'}>
        <header className={'relative flex items-center gap-3 px-6 py-3'}>
          <Image
            width={36}
            height={36}
            src={post.avatarOwner}
            className={'rounded-full'}
            alt={'photo of creator'}
          />
          <Typography variant={'h3'}>{post.userName}</Typography>
          {isAuth && (
            <Dots
              onClick={() => showBlock(!isVisible)}
              className={'fill-accent-500 absolute right-6 h-6 w-6 cursor-pointer'}
            />
          )}
          {isVisible && (
            <div
              className={
                'border-dark-100 bg-dark-500 absolute top-18 right-6 flex h-[85px] w-[137px] items-center justify-center'
              }
            >
              <div className={''}>
                <Button className={'mb-3 p-0'} variant={'text'}>
                  <Pencil className={'fill-light-100 mr-3 h-6 w-6'} />
                  <Typography className={'text-light-100'} variant={'regular_text_14'}>
                    Edit Post
                  </Typography>
                </Button>

                <Button className={'p-0'} onClick={() => setIsModalOpen(true)} variant={'text'}>
                  <Basket className={'fill-light-100 mr-3 h-6 w-5'} />
                  <Typography className={'text-light-100'} variant={'regular_text_14'}>
                    Delete Post
                  </Typography>
                </Button>
              </div>
            </div>
          )}
          <ModalWindow
            modalTitle='Delete Post'
            open={isModalOpen}
            className='h-[240px] w-[438px]'
            onClose={() => setIsModalOpen(false)}
          >
            <div className='relative mt-7.5 px-6'>
              <div className='pb-7.5'>
                <Typography variant='regular_text_16'>
                  Are you sure you want to delete this post?
                </Typography>
              </div>
              <div className='flex justify-end gap-6'>
                <Button variant={'outline'} onClick={postRemoveHandler} className='w-24'>
                  Yes
                </Button>
                <Button onClick={() => setIsModalOpen(false)} className='w-24'>
                  No
                </Button>
              </div>
            </div>
          </ModalWindow>
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
