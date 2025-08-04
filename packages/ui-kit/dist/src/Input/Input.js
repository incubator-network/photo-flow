'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React, { useState } from 'react'
import SearchIcon from '../icons/search.svg'
import EyeIcon from '../icons/eye.svg'
import EyeOffIcon from '../icons/eye-off.svg'
import { Typography } from '../Typography'
import { twMerge } from 'tailwind-merge'
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
  error: `${baseStyle} border-danger-500 text-light-100`,
}
export const Input = React.forwardRef(
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
    const [showPassword, setShowPassword] = useState(false)
    const currentVariant = errorText ? 'error' : variant
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    const inputPadding = type === 'search' ? 'pl-[42px]' : type === 'password' ? 'pr-[32px]' : ''
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type
    return _jsxs('div', {
      className: twMerge('text-left', className),
      children: [
        'search' !== type &&
          _jsx(Typography, {
            variant: 'regular_text_14',
            className: 'text-light-900 capitalize',
            children: label == '' || label ? label : type,
          }),
        _jsxs('div', {
          className: 'relative flex w-full items-center',
          children: [
            _jsx('input', {
              ref: ref,
              type: inputType,
              disabled: disabled,
              className: twMerge('w-full', variantStyles[currentVariant], inputPadding),
              ...props,
            }),
            type === 'search' &&
              _jsx(SearchIcon, {
                className: twMerge(
                  'h-6 w-6',
                  'absolute top-1/2 left-3 -translate-y-1/2 transform ' +
                    'brightness-0 invert filter',
                  disabled && 'opacity-50'
                ),
              }),
            type === 'password' &&
              _jsx('button', {
                type: 'button',
                disabled: disabled,
                onClick: togglePasswordVisibility,
                className: twMerge(
                  'absolute top-1/2 right-3 -translate-y-1/2 brightness-0 invert filter',
                  disabled && 'opacity-50'
                ),
                children: showPassword
                  ? _jsx(EyeOffIcon, { className: 'h-6 w-6' })
                  : _jsx(EyeIcon, { className: 'h-6 w-6' }),
              }),
          ],
        }),
        errorText &&
          _jsx(Typography, {
            variant: 'regular_text_14',
            className: twMerge('text-danger-500 ml-0 pt-0'),
            children: errorText,
          }),
      ],
    })
  }
)
Input.displayName = 'Input'
