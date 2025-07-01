import React from 'react'
import ClosePicture from '@/assets/icons/closeS.svg'
import PlusIcon from '@/assets/icons/plus-circle.svg'
import Image from 'next/image'

type PropsType = {
  imageUrls: string[]
  onRemove: (index: number) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const GalleryPreview = (props: PropsType) => {
  const { imageUrls, onRemove, inputRef, handleFileChange } = props
  return (
    <div className='absolute right-[12px] bottom-[60px] z-2 ml-[12px] flex gap-[12px] rounded-[2px] bg-[#171717C3] p-[12px]'>
      <div className='flex max-w-[360px] gap-[12px] overflow-x-auto'>
        {imageUrls.map((url, idx) => (
          <div key={idx} className='relative h-[80px] w-[80px] flex-shrink-0'>
            <Image
              src={url}
              alt={`Фото ${idx + 1}`}
              className='h-[80px] w-[80px] rounded-[2px] object-cover'
              width={80}
              height={80}
            />
            <div
              onClick={() => onRemove(idx)}
              className='absolute top-[2px] right-[2px] cursor-pointer rounded-[2px] bg-[#171717C3] p-[3px]'
            >
              <ClosePicture className='h-[6px] w-[6px]' />
            </div>
          </div>
        ))}
      </div>

      <label>
        <PlusIcon
          width={'36px'}
          height={'36px'}
          className='cursor-pointer'
          onClick={() => inputRef.current?.files}
        />
        <input
          multiple
          accept='image/jpeg, image/png'
          type='file'
          className={'hidden'}
          ref={inputRef}
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}
