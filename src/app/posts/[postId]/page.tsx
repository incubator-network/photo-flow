'use client'
import { useParams, useRouter } from 'next/navigation'
import AvatarIcon from '@/assets/icons/post-avatar.svg'
import ArrowPostLeftIcon from '@/assets/icons/arrow-post-left.svg'
import ArrowPostRightIcon from '@/assets/icons/arrow-post-right.svg'
import { Typography } from '@/components/ui/typography/Typography'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import { Button } from '@/components/ui/button/Button'
import { useState } from 'react'
import { Card } from '@/components/ui/Card/Card'
import Image from 'next/image'
import { useRemovePostMutation } from '@/lib/feature/post/api/postApi'

export default function RemovePost() {
  const [deletePost] = useRemovePostMutation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { postId } = useParams<{ postId: string }>()
  const [isVisible, setIsVisible] = useState(false)

  const isValidPostId = !isNaN(Number(postId)) && Number(postId) > 0

  const postRemoveHandler = async () => {
    setIsModalOpen(true)
    if (!isValidPostId) {
      console.error('Invalid postId')
      return
    }
    try {
      const res = await deletePost(Number(postId)).unwrap()
      router.back()
      console.log(res)
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
    <div className='flex flex-col items-center justify-center'>
      <Card className={'flex h-[550px] w-[971px] grid-cols-2 border-2'}>
        <div className={'relative w-[490px] border-2'}>
          <Image width={490} height={562} src={'/post-img.png'} alt={'post'} />
          <div className={'absolute inset-0 flex items-center justify-between px-4'}>
            <ArrowPostLeftIcon className={'h-12 w-12 hover:opacity-70'} />
            <ArrowPostRightIcon className={'h-12 w-12 hover:opacity-70'} />
          </div>
        </div>
        <div>
          <div className={'flex h-[493px] w-[490px]'}>
            <div className={'flex h-15 w-full items-center justify-between p-2'}>
              <div className={'flex items-center'}>
                <AvatarIcon className={'border-rounded-full h-9 w-9'} />
                <Typography variant='h3'>URLProfiele</Typography>
              </div>

              <div className={'relative'}>
                <Typography
                  onClick={() => showBlock(!isVisible)}
                  className={'cursor-pointer'}
                  variant='regular_text_14'
                >
                  ...
                </Typography>
                {isVisible && (
                  <div
                    className={
                      'border-dark-100 absolute top-full right-0 h-[85px] w-[145px] flex-col items-center gap-2 border px-2'
                    }
                  >
                    <Button variant={'text'}>
                      <Typography variant={'regular_text_14'}>Edit Post</Typography>
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)} variant={'text'}>
                      <Typography variant={'regular_text_14'}>Delete Post</Typography>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <hr />
          </div>
        </div>
      </Card>
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
    </div>
  )
}
