'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import EyeIcon from '@/assets/icons/eye.svg'
import EyeOffIcon from '@/assets/icons/eye-off.svg'
import { Typography } from '@/components/ui/typography/Typography'
import { twMerge } from 'tailwind-merge'

type InputVariant = 'default' | 'disabled' | 'error'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant
  errorText?: string | null
  disabled?: boolean
  label?: string
}

const baseStyle = `
  flex items-center justify-center
  h-[36px] px-[12px] py-[6px]
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
  disabled: `${baseStyle} border-dark-300 disabled:opacity-50`,
  error: `${baseStyle} border-danger-500 text-light-100 text-regular-14`,
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      variant = 'default',
      errorText = '',
      disabled = false,
      className = '',
      label,
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
            className={'text-light-900 capitalize'}
          >
            {label ? label : type}
          </Typography>
        )}
        <div className={'relative flex w-full items-center'}>
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
            <SearchIcon
              className={twMerge(
                'h-6 w-6',
                'absolute top-1/2 left-3 -translate-y-1/2 transform ' +
                  'brightness-0 invert filter',
                disabled && 'opacity-50'
              )}
            />
          )}
          {type === 'password' && (
            <button
              type='button'
              disabled={disabled}
              onClick={togglePasswordVisibility}
              className={twMerge(
                'absolute top-1/2 right-3 -translate-y-1/2 brightness-0 invert filter',
                disabled && 'opacity-50'
              )}
            >
              {showPassword ? (
                <EyeOffIcon className={'h-6 w-6'} />
              ) : (
                <EyeIcon className={'h-6 w-6'} />
              )}
            </button>
          )}
        </div>
        {errorText && (
          <Typography
            variant={'regular_text_14'}
            className={twMerge('text-danger-500 ml-0 pt-0')}
          >
            {errorText}
          </Typography>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
