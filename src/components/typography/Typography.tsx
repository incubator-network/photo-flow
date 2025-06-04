import { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'

type PropsType = {
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_text_16'
    | 'bold_text_16'
    | 'regular_text_14'
    | 'medium_text_14'
    | 'bold_text_14'
    | 'small_text'
    | 'semi_bold_small_text'
    | 'regular_link'
    | 'small_link'
  asChild?: boolean
} & HTMLAttributes<HTMLElement>

const defaultTags = {
  large: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  regular_text_16: 'p',
  bold_text_16: 'p',
  regular_text_14: 'p',
  medium_text_14: 'p',
  bold_text_14: 'p',
  small_text: 'span',
  semi_bold_small_text: 'span',
  regular_link: 'a',
  small_link: 'a',
}

const variantClasses = {
  large: 'text-large',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  regular_text_16: 'text-regular-16',
  bold_text_16: 'text-bold-16',
  regular_text_14: 'text-regular-14',
  medium_text_14: 'text-medium-14',
  bold_text_14: 'text-bold-14',
  small_text: 'text-small',
  semi_bold_small_text: 'text-semi-bold-small',
  regular_link: 'text-regular-link',
  small_link: 'text-small-link',
}

export const Typography = ({
  variant = 'regular_text_16',
  className,
  asChild,
  children,
  ...props
}: PropsType) => {
  const Component = asChild ? Slot : defaultTags[variant]
  return (
    <Component
      className={twMerge(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
