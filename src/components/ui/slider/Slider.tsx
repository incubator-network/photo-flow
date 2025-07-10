'use client'

import { Images } from '@/lib/feature/posts/api/postsApi.types'
import React, { useState } from 'react'
import Image from 'next/image'
import ArrowBack from '@/assets/icons/arrow-back.svg'
import ArrowForward from '@/assets/icons/arrow-forward.svg'
import { twMerge } from 'tailwind-merge'

type PropsType = {
  images: Images[] | string[]
  data: 'uiData' | 'serverData'
  classname?: string
}

export default function Slider({ images, data, classname }: PropsType) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleClickBack = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleClickNext = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={twMerge('relative h-full w-[490px]', classname)}>
      {data === 'serverData' &&
        (images as Images[]).map((image, index) => (
          <Image
            className={`absolute top-0 left-0 object-cover transition-opacity duration-500 ease-in-out ${
              index === currentImageIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            fill
            key={image.uploadId}
            src={image.url}
            alt={`post photo ${index + 1}`}
          />
        ))}

      {data === 'uiData' &&
        (images as string[]).map((src, index) =>
          src ? (
            <Image
              className={`absolute top-0 left-0 object-cover transition-opacity duration-500 ease-in-out ${
                index === currentImageIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
              fill
              key={src}
              src={src}
              alt={`post photo ${index + 1}`}
            />
          ) : null
        )}

      {images.length > 1 && (
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
            {data === 'serverData' &&
              (images as Images[]).map((image, index) => (
                <div
                  key={image.uploadId}
                  className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-accent-500' : 'bg-light-100'}`}
                />
              ))}

            {data === 'uiData' &&
              (images as string[]).map((src, index) => (
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
