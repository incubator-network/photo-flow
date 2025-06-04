import React from 'react'
import { Slot } from '@radix-ui/react-slot'

type propsType = {
  maxWidth?: string
  height?: string
  asChild?: boolean
}
export const SuperCard = (props: propsType) => {
  const { maxWidth, height, asChild } = props
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
      className={`
      bg-[var(--color-dark-300)]
        rounded-[2px]
        border border-[var(--color-dark-100)] 
  `}
    ></Comp>
  )
}
