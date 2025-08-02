'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../Typography'
import Close from '@/assets/icons/close.svg'
import { useEffect, useState } from 'react'
export const Alert = ({ message, type, onClose }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  useEffect(() => {
    setIsAlertVisible(true)
    const hideTimeout = setTimeout(() => {
      setIsAlertVisible(false)
    }, 2700)
    const remoteTimeout = setTimeout(() => {
      onClose()
    }, 3000)
    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(remoteTimeout)
    }
  }, [onClose])
  return _jsxs('div', {
    className: twMerge(
      'bg-success-900 border-success-500 fixed bottom-5 left-5 z-1000 flex w-[387px] justify-between border px-6 py-3 transition-all duration-300 ease-in-out',
      type === 'error' && 'bg-danger-900 border-danger-500',
      isAlertVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
    ),
    children: [
      _jsxs(Typography, {
        children: [
          type === 'error' && _jsx('span', { className: 'font-bold', children: 'Error! ' }),
          message,
        ],
      }),
      _jsx(Close, { onClick: onClose, className: 'fill-light-100 h-6 w-6 cursor-pointer' }),
    ],
  })
}
