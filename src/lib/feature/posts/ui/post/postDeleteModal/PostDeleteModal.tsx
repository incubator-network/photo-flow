import React from 'react'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import { Typography } from '@/components/ui/typography/Typography'
import { Button } from '@/components/ui/button/Button'
import { useRouter } from 'next/navigation'
import { useRemovePostMutation } from '@/lib/feature/posts/api/postsApi'

type PostActionsModalProps = {
  open: boolean
  onClose: () => void
  setIsModalOpen: (isModalOpen: boolean) => void
  postId: number
}

function PostDeleteModal({ open, onClose, postId, setIsModalOpen }: PostActionsModalProps) {
  const router = useRouter()

  const [deletePost] = useRemovePostMutation()

  const postRemoveHandler = async () => {
    setIsModalOpen(true)
    try {
      await deletePost(postId).unwrap()
      router.back()
    } catch (error) {
      console.error('The post has not been found', error)
    } finally {
      setIsModalOpen(false)
    }
  }
  return (
    <ModalWindow
      modalTitle='Delete Post'
      open={open}
      className='h-[240px] w-[438px]'
      onClose={onClose}
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
          <Button onClick={onClose} className='w-24'>
            No
          </Button>
        </div>
      </div>
    </ModalWindow>
    //   w378
  )
}

export default PostDeleteModal
