import { jsx as _jsx } from 'react/jsx-runtime'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'
export const Card = props => {
  const { asChild, className, children } = props
  const Comp = asChild ? Slot : 'div'
  return _jsx(Comp, {
    className: twMerge(`bg-dark-500 border-dark-300 rounded-[2px] border`, className),
    children: children,
  })
}
