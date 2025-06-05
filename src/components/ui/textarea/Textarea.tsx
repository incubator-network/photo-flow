'use client'

import { ChangeEvent, memo, TextareaHTMLAttributes, useState } from 'react'

const textareaVariants = {
  default: `
      p-[6px_12px] 
      bg-dark-500 
      text-light-100
      text-regular-16
      border 
      outline-none 
      resize-none
      rounded-[2px] 
      overflow-y-auto
      [scrollbar-width:none]
      [-ms-overflow-style:none] 
      [&::-webkit-scrollbar]:hidden 
      enabled:active:border-light-100
      enabled:active:text-light-100
  `,
  focus: `
      border-accent-700 
  `,
  blur: `
     border-dark-100 
     text-light-900
  `,
  error: `
      border-danger-500
  `,
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  changeValue: (value: string) => void
  textareaLabel?: string
  width?: string
  height?: string
  error?: string | null
}

export const Textarea = memo(
  ({
    value,
    changeValue,
    textareaLabel,
    width = '284',
    height = '84',
    error = null,
    ...props
  }: TextareaProps) => {
    const [isFocused, setIsFocused] = useState(false)
    let calculatedClassName = `w-[${width}px] h-[${height}px] ${textareaVariants['default']}`
    if (error) {
      calculatedClassName += textareaVariants['error']
    } else if (isFocused) {
      calculatedClassName += textareaVariants['focus']
    } else {
      calculatedClassName += textareaVariants['blur']
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
      changeValue(e.target.value)
    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)

    return (
      <div className={'inline-flex flex-col items-start'}>
        {textareaLabel && (
          <span className={'text-light-900 text-regular-14'}>
            {textareaLabel}
          </span>
        )}
        <textarea
          className={calculatedClassName}
          defaultValue={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        {error && (
          <span className={'text-danger-500 text-regular-14'}>{error}</span>
        )}
      </div>
    )
  }
)
