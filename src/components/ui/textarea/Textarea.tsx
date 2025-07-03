'use client'

import { ChangeEvent, memo, TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/components/ui/typography/Typography'

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

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number
  placeholder?: string
  className: string
  value?: string
  changeValue?: (value: string) => void
  textareaLabel?: string
  error?: string | null
  register?: UseFormRegisterReturn
  textareaLabelStyles?: string
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
    textareaLabelStyles,
    ...props
  }: TextareaProps) => {
    const calculatedClassName = twMerge(
      textareaVariants.default,
      error
        ? 'border-danger-500 text-light-100'
        : 'focus:border-light-100 blur:border-dark-100 blur:border-dark-100',
      className
    )

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (changeValue) {
        changeValue(e.target.value)
      }
    }

    return (
      <div className={'inline-flex flex-col items-start'}>
        {textareaLabel && (
          <Typography
            variant={'regular_text_14'}
            className={twMerge('text-light-900', textareaLabelStyles)}
          >
            {textareaLabel}
          </Typography>
        )}
        <textarea
          maxLength={maxLength}
          placeholder={placeholder}
          className={calculatedClassName}
          value={register ? undefined : value}
          onChange={register ? undefined : onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          {...register}
          {...props}
        />
        {error && (
          <Typography variant={'regular_text_14'} className={'text-danger-500'}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
