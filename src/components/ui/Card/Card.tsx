import React, { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'

type propsType = {
  asChild?: boolean
} & ComponentProps<'div'>
export const Card = (props: propsType) => {
  const { asChild, className, children } = props
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={twMerge(
        `bg-dark-300 border-dark-100 rounded-[2px] border`,
        className
      )}
    >
      {children}
    </Comp>
  )
}
