import { jsx as _jsx } from 'react/jsx-runtime'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'
const variantStyles = {
  primary: `bg-accent-500
            active:bg-accent-700 active:text-light-500 
            hover:bg-accent-100
            focus-visible:outline-accent-700 focus-visible:outline-2 
            disabled:bg-accent-900 disabled:text-light-900`,
  secondary: `bg-dark-300 active:bg-[#212121]
              hover:bg-dark-100
              focus-visible:outline-accent-300 focus-visible:outline-2 
              disabled:bg-dark-500 disabled:text-light-900`,
  outline: `bg-transparent text-accent-500 border border-accent-500 
            active:text-accent-700 
            hover:text-accent-100 hover:border-accent-100 
            focus-visible:outline-accent-700 focus-visible:outline-2 
            disabled:border-accent-900 disabled:text-accent-900`,
  text: `bg-transparent text-accent-500 
         active:text-accent-700 
         hover:text-accent-100 
         focus-visible:outline-accent-500 focus-visible:outline-2 
         disabled:text-accent-900`,
}
export const Button = props => {
  const { variant = 'primary', asChild, className, ...restProps } = props
  const Comp = asChild ? Slot : 'button'
  return _jsx(Comp, {
    className: twMerge(
      'flex cursor-pointer items-center justify-center rounded-xs border border-transparent px-6 py-1.5',
      variantStyles[variant],
      className
    ),
    ...restProps,
  })
}
