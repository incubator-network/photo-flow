import React from 'react'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import { Button } from '@/components/ui/button/Button'
import ArrowNextIcon from '@/assets/icons/arrow-next.svg'
import ArrowPrevIcon from '@/assets/icons/arrow-prev.svg'
import IconImg from '@/assets/icons/img.svg'
import Image from 'next/image'

type PropsType = {
  imageUrls: string[]
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onBack: () => void
  onNextStep: () => void
  openReview: boolean
  onToggleReview: () => void
  children: React.ReactNode
}
export const PostCreateFormStep2 = (props: PropsType) => {
  const {
    children,
    onNextStep,
    onNext,
    imageUrls,
    onBack,
    onPrev,
    onToggleReview,
    openReview,
    activeIndex,
  } = props

  return (
    <ModalWindow
      hiddenCloseButton={true}
      modalTitle={'Cropping'}
      className={'h-[564px] w-[492px] overflow-hidden text-center'}
      open={true}
      onClose={() => null}
    >
      <ArrowLeftIcon
        width={'24px'}
        height={'24px'}
        className={'absolute top-[17px] left-[0px] cursor-pointer'}
        onClick={onBack}
      />
      <Button
        className={'absolute top-[10px] right-[24px] font-semibold'}
        variant={'text'}
        onClick={onNextStep}
      >
        Next
      </Button>
      <form className='relative flex h-[504px] w-[490px]'>
        {imageUrls.length > 1 && activeIndex < imageUrls.length - 1 && (
          <button
            type={'button'}
            className='absolute top-1/2 right-[10px] z-2 flex h-[36px] w-[36px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] bg-[#171717C3]'
            onClick={onNext}
          >
            <ArrowNextIcon width={'24px'} height={'24px'} />
          </button>
        )}

        {activeIndex > 0 && (
          <button
            type={'button'}
            className='absolute top-1/2 left-[10px] z-2 flex h-[36px] w-[36px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] bg-[#171717C3]'
            onClick={onPrev}
          >
            <ArrowPrevIcon width={'24px'} height={'24px'} />
          </button>
        )}

        <div className='flex h-full w-full'>
          {imageUrls.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt='Picture'
              className={`absolute top-0 left-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${activeIndex === idx ? 'z-1 opacity-100' : 'opacity-0'} `}
              draggable={false}
              fill
            />
          ))}
        </div>
        {children}

        <button
          type='button'
          onClick={onToggleReview}
          className={
            'absolute right-[10px] bottom-[10px] z-2 cursor-pointer rounded-[2px] bg-[#171717C3] p-[6px]'
          }
        >
          <IconImg
            className={`h-[24px] w-[24px] ${openReview && 'fill-accent-500'} `}
          />
        </button>
      </form>
    </ModalWindow>
  )
}
