'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import Image from 'next/image'
import searchIcon from '@/assets/inputIcons/search.svg'
import eyeIcon from '@/assets/inputIcons/eye.svg'
import eyeOffIcon from '@/assets/inputIcons/eye-off.svg'

type InputVariant =
  | 'default'
  | 'active'
  | 'hover'
  | 'focus'
  | 'disabled'
  | 'error'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant
  error?: string | null
}

const baseStyle = `
  flex items-center justify-center
  w-[280px] h-[36px] px-[12px]
  text-regular-14
  bg-transparent
  rounded-[2px]
  border
  transition-colors
  outline-none
  disabled:opacity-50  
`

const variantStyles = {
  default: `${baseStyle}
    border-[var(--color-dark-100)]
    hover:border-[var(--color-light-900)] 
  `,
  active: `${baseStyle}
    border-[var(--color-light-100)_!important]
    bg-[var(--color-dark-500)_!important]
  `,
  hover: `${baseStyle}
    border-[var(--color-light-900)]
  `,
  focus: `${baseStyle}
    border-[var(--color-accent-500)]
  `,
  disabled: `${baseStyle}
    border-[var(--color-dark-300)]
    disabled:opacity-50 
  `,
  error: `${baseStyle}
    border-[var(--color-danger-500)]
    text-[var(--color-light-100)]
  `,
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      variant = 'default',
      error = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const currentVariant = error ? 'error' : variant

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    const inputPadding =
      type === 'search' ? 'pl-[42px]' : type === 'password' ? 'pr-[32px]' : ''

    const inputType =
      type === 'password' ? (showPassword ? 'text' : 'password') : type
    return (
      <div className={'text-left '}>
        {'search' !== type && (
          <span
            className={`text-regular-14 capitalize ${disabled ? 'opacity:-50' : ''} `}
          >
            {type}
          </span>
        )}

        <div className='relative'>
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={`${variantStyles[currentVariant]} ${className}  ${inputPadding}
            }`}
            {...props}
          />
          {type === 'search' && (
            <Image
              src={searchIcon}
              alt='Search'
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                disabled ? 'opacity-50' : ''
              }  
              filter brightness-0 invert
              `}
              width={20}
              height={20}
              // style={{ filter: disabled ? 'opacity(50%)' : 'none' }}
            />
          )}
          {type === 'password' && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2
            ${disabled ? 'opacity-50' : ''}
            filter brightness-0 invert
          `}
              disabled={disabled}
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
        {variant === 'error' && (
          <span className={'text-danger-500 text-regular-14 ml-0'}>
            {error}
          </span>
        )}
      </div>
    )
  }
)
