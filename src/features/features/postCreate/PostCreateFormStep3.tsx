import React from 'react'
import { ModalWindow } from '@/components/ui/modalWindow/ModalWindow'
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import { Button } from '@/components/ui/button/Button'
import ArrowNextIcon from '@/assets/icons/arrow-next.svg'
import ArrowPrevIcon from '@/assets/icons/arrow-prev.svg'
import { Typography } from '@/components/ui/typography/Typography'
import { Textarea } from '@/components/ui/textarea/Textarea'
import Image from 'next/image'

type PropsType = {
  imageUrls: string[]
  activeIndex: number
  isModalOpen: boolean
  setStep: (value: number) => void
  handlePublish: () => void
  onNext: () => void
  onPrev: () => void
  children: React.ReactNode
  setValueDescription: (description: string) => void
  valueDescription: string
}

export const PostCreateFormStep3 = (props: PropsType) => {
  const {
    isModalOpen,
    setStep,
    handlePublish,
    imageUrls,
    activeIndex,
    onPrev,
    onNext,
    children,
    setValueDescription,
    valueDescription,
  } = props
  return (
    <ModalWindow
      hiddenCloseButton={true}
      modalTitle={'Cropping'}
      className={'h-[564px] w-[972px] overflow-hidden text-center'}
      open={isModalOpen}
      onClose={() => null}
    >
      <ArrowLeftIcon
        width={'24px'}
        height={'24px'}
        className={'absolute top-[17px] left-[0px] cursor-pointer'}
        onClick={() => setStep(2)}
      />
      <Button
        className={'absolute top-[10px] right-[24px] font-semibold'}
        variant={'text'}
        onClick={handlePublish}
      >
        Publish
      </Button>
      <form className='relative flex h-[504px] w-full'>
        <div className='relative flex h-[504px] w-[490px]'>
          {imageUrls.length > 1 && activeIndex < imageUrls.length - 1 && (
            <button
              type={'button'}
              className='absolute top-1/2 right-[10px] z-2 flex h-[48px] w-[48px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] bg-[#17171782]'
              onClick={onNext}
            >
              <ArrowNextIcon width={'48px'} height={'48px'} />
            </button>
          )}

          {activeIndex > 0 && (
            <button
              type={'button'}
              className='absolute top-1/2 left-[10px] z-2 flex h-[48px] w-[48px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] bg-[#17171782]'
              onClick={onPrev}
            >
              <ArrowPrevIcon width={'48px'} height={'48px'} />
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
        </div>
        <div className='w-[481px] p-[24px]'>
          <div className='mb-[24px] flex items-center gap-[12px]'>
            <span className='h-[36px] w-[36px] rounded-full bg-amber-700'></span>
            <Typography className='text-left' variant={'h2'}>
              URLProfile
            </Typography>
          </div>
          <Textarea
            maxLength={500}
            changeValue={setValueDescription}
            value={valueDescription}
            className={'text-regular-16 h-[120px] w-[433px] font-light'}
            textareaLabel={'Add publication descriptions'}
            placeholder={'Text-area'}
          />
          <div className='text-light-900 text-small-12 text-right'>
            {valueDescription.length}/500
          </div>
        </div>
      </form>
    </ModalWindow>
  )
}
