'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../Typography'
const textareaVariants = {
  default: [
    'p-[6px_12px]',
    'bg-dark-500',
    'text-regular-16',
    'text-light-900',
    'border',
    'outline-none',
    'resize-none',
    'rounded-[2px]',
    'overflow-y-auto',
    '[scrollbar-width:none]',
    '[-ms-overflow-style:none]',
    '[&::-webkit-scrollbar]:hidden',
    'transition-colors duration-200',
    'focus:text-light-100',
  ].join(' '),
}
export const Textarea = memo(
  ({
    maxLength,
    placeholder,
    className,
    value,
    changeValue,
    textareaLabel,
    error = null,
    onBlur,
    onFocus,
    register,
    ...props
  }) => {
    const calculatedClassName = twMerge(
      textareaVariants.default,
      error
        ? 'border-danger-500 text-light-100'
        : 'focus:border-light-100 blur:border-dark-100 blur:border-dark-100',
      className
    )
    const onChangeHandler = e => {
      if (changeValue) {
        changeValue(e.target.value)
      }
    }
    return _jsxs('div', {
      className: 'inline-flex flex-col items-start',
      children: [
        textareaLabel &&
          _jsx(Typography, {
            variant: 'regular_text_14',
            className: 'text-light-900',
            children: textareaLabel,
          }),
        _jsx('textarea', {
          maxLength: maxLength,
          placeholder: placeholder,
          className: calculatedClassName,
          value: register ? undefined : value,
          onChange: register ? undefined : onChangeHandler,
          onFocus: onFocus,
          onBlur: onBlur,
          ...register,
          ...props,
        }),
        error &&
          _jsx(Typography, {
            variant: 'regular_text_14',
            className: 'text-danger-500',
            children: error,
          }),
      ],
    })
  }
)
Textarea.displayName = 'Textarea'
