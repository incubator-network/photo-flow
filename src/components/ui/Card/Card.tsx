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
        `bg-dark-500 border-dark-300 rounded-[2px] border`,
        className
      )}
    >
      {children}
    </Comp>
  )
}
