import React, { useState } from 'react'
import Image from 'next/image'
import ArrowBack from '@/assets/icons/arrow-back.svg'
import ArrowForward from '@/assets/icons/arrow-forward.svg'

type PropsType = {
  imageUrls: string[]
}

export const ReviewSlider = (props: PropsType) => {
  const { imageUrls } = props

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleClickBack = () => {
    setCurrentImageIndex(prev => (prev === 0 ? imageUrls.length - 1 : prev - 1))
  }

  const handleClickNext = () => {
    setCurrentImageIndex(prev => (prev === imageUrls.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={'relative h-full w-[490px]'}>
      {imageUrls.map((src, index) => (
        <Image
          className={`absolute top-0 left-0 object-cover transition-opacity duration-500 ease-in-out ${
            index === currentImageIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
          fill
          key={src}
          src={src}
          alt={`post photo ${index + 1}`}
        />
      ))}
      {imageUrls.length > 1 && (
        <>
          <div className='bg-dark-300/60 absolute top-1/2 left-3 z-11 flex -translate-y-1/2 cursor-pointer rounded'>
            <ArrowBack onClick={handleClickBack} className={'fill-light-100 h-12 w-12'} />
          </div>
          <div className='bg-dark-300/60 absolute top-1/2 right-3 z-11 flex -translate-y-1/2 cursor-pointer rounded'>
            <ArrowForward onClick={handleClickNext} className={'fill-light-100 h-12 w-12'} />
          </div>
          <div
            className={
              'bg-dark-300 absolute bottom-3 left-1/2 z-11 flex -translate-x-1/2 gap-3 rounded-xs p-2'
            }
          >
            {imageUrls.map((src, index) => (
              <div
                key={src}
                className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-accent-500' : 'bg-light-100'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
