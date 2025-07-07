import { Textarea } from '@/components/ui/textarea/Textarea'
import { Button } from '@/components/ui/button/Button'
import { useUpdatePostMutation } from '../../../api/postsApi'
import { UpdatePostMutation } from '../../../api/postsApi.types'
import { twMerge } from 'tailwind-merge'

type EditPostFormProps = {
  isEditMode: boolean
  textValue: string
  setTextValue: (value: string) => void
  setIsEditMode: (value: boolean) => void
  postId: number
}

export const EditPostForm = ({
  textValue,
  isEditMode,
  postId,
  setTextValue,
  setIsEditMode,
}: EditPostFormProps) => {
  const [updatePost] = useUpdatePostMutation() as UpdatePostMutation

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        await updatePost({ description: textValue, postId })
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
  )
}
