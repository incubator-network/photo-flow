'use client'
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime'
import { useState } from 'react'
import Image from 'next/image'
import ArrowBack from '../icons/arrow-back.svg'
import ArrowForward from '../icons/arrow-forward.svg'
import { twMerge } from 'tailwind-merge'
export const Slider = ({ images, data, classname, getId, getUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const handleClickBack = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }
  const handleClickNext = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }
  // Для постов без фотографий
  if (images.length === 0) {
    images = [{ url: '/no-image.svg', uploadId: 'uniqueID' }]
  }
  return _jsxs('div', {
    className: twMerge('relative h-full w-[490px]', classname),
    children: [
      data === 'serverData' &&
        images.map((image, index) =>
          _jsx(
            Image,
            {
              className: `absolute top-0 left-0 object-cover transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'}`,
              fill: true,
              src: getUrl(image),
              alt: `post photo ${index + 1}`,
            },
            getId(image)
          )
        ),
      data === 'uiData' &&
        images.map((src, index) =>
          src
            ? _jsx(
                Image,
                {
                  className: `absolute top-0 left-0 object-cover transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'}`,
                  fill: true,
                  src: src,
                  alt: `post photo ${index + 1}`,
                },
                src
              )
            : null
        ),
      images.length > 1 &&
        _jsxs(_Fragment, {
          children: [
            _jsx('div', {
              className:
                'bg-dark-300/60 absolute top-1/2 left-3 z-11 flex -translate-y-1/2 cursor-pointer rounded',
              children: _jsx(ArrowBack, {
                onClick: handleClickBack,
                className: 'fill-light-100 h-12 w-12',
              }),
            }),
            _jsx('div', {
              className:
                'bg-dark-300/60 absolute top-1/2 right-3 z-11 flex -translate-y-1/2 cursor-pointer rounded',
              children: _jsx(ArrowForward, {
                onClick: handleClickNext,
                className: 'fill-light-100 h-12 w-12',
              }),
            }),
            _jsxs('div', {
              className:
                'bg-dark-300 absolute bottom-3 left-1/2 z-11 flex -translate-x-1/2 gap-3 rounded-xs p-2',
              children: [
                data === 'serverData' &&
                  images.map((image, index) =>
                    _jsx(
                      'div',
                      {
                        className: `h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-accent-500' : 'bg-light-100'}`,
                      },
                      getId(image)
                    )
                  ),
                data === 'uiData' &&
                  images.map((src, index) =>
                    _jsx(
                      'div',
                      {
                        className: `h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-accent-500' : 'bg-light-100'}`,
                      },
                      src
                    )
                  ),
              ],
            }),
          ],
        }),
    ],
  })
}
