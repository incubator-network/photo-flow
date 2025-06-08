'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import Image from 'next/image'
import searchIcon from '@/assets/icons/search.svg'
import eyeIcon from '@/assets/icons/eye.svg'
import eyeOffIcon from '@/assets/icons/eye-off.svg'
import { Typography } from '@/components/ui/typography/Typography'
import { twMerge } from 'tailwind-merge'

type InputVariant = 'default' | 'disabled' | 'error'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant
  errorText?: string | null
  disabled?: boolean
}

const baseStyle = `
  flex items-center justify-center
  w-[280px] h-[36px] px-[12px]
  text-regular-16 leading-medium
  bg-transparent
  border
  border-dark-100
  rounded-[2px]
  transition-colors
  outline-none
  disabled:opacity-50 
  text-light-900 
  hover:border-light-900
  focus:border-accent-500 focus:bg-dark-500 focus:text-light-100
  active:border-light-100! active:bg-dark-500! active:text-light-100!
  not-placeholder-shown:text-light-100  
`

const variantStyles = {
  default: baseStyle,
  disabled: `${baseStyle}
    border-dark-300
    disabled:opacity-50 
  `,
  error: `${baseStyle}
    border-danger-500
    text-light-100
    text-regular-14
  `,
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      variant = 'default',
      errorText = '',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const currentVariant = errorText ? 'error' : variant

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    const inputPadding =
      type === 'search' ? 'pl-[42px]' : type === 'password' ? 'pr-[32px]' : ''

    const inputType =
      type === 'password' ? (showPassword ? 'text' : 'password') : type
    return (
      <div className={twMerge('text-left', className)}>
        {'search' !== type && (
          <Typography
            variant={'regular_text_14'}
            className={'capitalize text-light-900'}
          >
            {type}
          </Typography>
        )}
        <div className='relative w-[280px]'>
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={twMerge(
              'w-full',
              variantStyles[currentVariant],
              inputPadding
            )}
            {...props}
          />
          {type === 'search' && (
            <Image
              src={searchIcon}
              alt='Search'
              className={twMerge(
                'absolute left-3 top-1/2 transform -translate-y-1/2 ' +
                  'filter brightness-0 invert',
                disabled && 'opacity-50'
              )}
              width={20}
              height={20}
            />
          )}
          {type === 'password' && (
            <button
              type='button'
              disabled={disabled}
              onClick={togglePasswordVisibility}
              className={twMerge(
                ' absolute right-3 top-1/2 transform -translate-y-1/2 ' +
                  'filter brightness-0 invert',
                disabled && 'opacity-50'
              )}
            >
              <Image
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt={showPassword ? 'Hide password' : 'Show password'}
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
        {errorText && (
          <Typography
            variant={'regular_text_14'}
            className={twMerge('text-danger-500 pt-0 ml-0 capitalize')}
          >
            {errorText}
          </Typography>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
