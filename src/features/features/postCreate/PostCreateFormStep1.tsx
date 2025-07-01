import React from 'react'
import IconImg from '@/assets/icons/img.svg'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'

export type PropsType = {
  inputRef: React.RefObject<HTMLInputElement | null>
  onFilesSelected: (files: File[]) => void
  maxFiles: number
  maxFileSize: number // bytes
  isModalOpen: boolean
  onClose: () => void
}

export const PostCreateFormStep1 = (props: PropsType) => {
  const {
    maxFiles,
    onFilesSelected,
    maxFileSize,
    onClose,
    isModalOpen,
    inputRef,
  } = props

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    const validFiles = files.filter(file => file.size <= maxFileSize)

    if (validFiles.length < files.length) {
      const oversized = files.filter(file => file.size > maxFileSize)
      alert(
        'Некоторые файлы превышают 20 МБ:\n' +
          oversized.map(f => f.name).join(', ')
      )
    }

    if (validFiles.length > maxFiles) {
      alert(`Количество фото не должно превышать ${maxFiles}`)
      return
    }
    if (validFiles.length > 0 && onFilesSelected) {
      onFilesSelected(validFiles)
    }

    e.target.value = ''
  }

  return (
    <ModalWindow
      modalTitle={'Create Post'}
      className={'h-[564px] w-[492px] px-[10px]'}
      open={isModalOpen}
      onClose={onClose}
    >
      <form className='flex flex-col items-center justify-center pt-[72px]'>
        <div
          className={
            'bg-dark-500 inline-flex min-h-[228px] max-w-[400px] min-w-[222px] items-center justify-center'
          }
        >
          <IconImg className='h-[46px] w-[46px] fill-white' />
        </div>

        <label
          className={
            'bg-accent-500 text-regular-16 mt-[60px] flex h-[36px] w-[220px] cursor-pointer items-center justify-center rounded-[2px]'
          }
        >
          Select from Computer
          <input
            multiple
            accept='image/jpeg, image/png'
            type='file'
            className={'hidden'}
            ref={inputRef}
            onChange={handleFileChange}
          />
        </label>
      </form>
    </ModalWindow>
  )
}
