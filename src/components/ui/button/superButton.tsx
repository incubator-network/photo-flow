// 'use client'

import React, { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'

type PropsType = {
  variant: 'primary' | 'secondary' | 'outline' | 'text'
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
}
const variantStyles = {
  primary: `
               flex items-center justify-center 
               text-base 
               text-[var(--color-light-100)]  
               font-[600]
               w-[182px] h-[36px] 
               bg-[var(--color-accent-500)]               
               hover:bg-[var(--color-accent-100)] 
               focus:bg-[var(--color-accent-700)] 
               focus-visible:outline-1
               focus-visible:outline-[var(--color-accent-700)]
               active:bg-[var(--color-accent-700)] 
               disabled:bg-[var(--color-accent-900)]
               disabled:text-[var(--color-light-900)] 
               rounded-[2px]`,
  secondary: `
              flex items-center justify-center 
              text-[var(--color-light-100)]  
              font-[600]
              text-base 
              w-[182px] h-[36px]  
              bg-[var(--color-dark-300)] 
              rounded-[2px]
              hover:bg-[var(--color-dark-100)]
              focus-visible:bg-[var(--color-dark-300)]
              focus-visible:outline-1
              focus-visible:outline-[var(--color-accent-300)]
              active:bg-[#212121] 
              disabled:bg-[var(--color-dark-500)] 
              disabled:text-[var(--color-light-900)]`,
  outline: `
             flex items-center justify-center
             text-base 
             w-[182px] h-[36px]
             text-[var(--color-accent-500)]
             font-[600]
             border border-[var(--color-accent-500)] 
             rounded-[2px]
             hover:border-[var(--color-accent-100)]
             hover:text-[var(--color-accent-100)]
             focus:outline-[var(--color-accent-700)] focus:text-[var(--color-accent-700)]
             active:border-[var(--color-accent-700)] active:text-[var(--color-accent-700)]
             disabled:border-[var(--color-accent-900)] 
             disabled:text-[var(--color-accent-900)]`,
  text: `
             flex items-center justify-center
             text-base w-[100px] h-[36px]
             text-[var(--color-accent-500)]
             font-[600]
             rounded-[2px]
             hover:text-[var(--color-accent-100)]
             focus:outline-[var(--color-accent-700)] focus:text-[var(--color-accent-700)]
             focus-visible:outline-1
             active:text-[var(--color-accent-700)]
             disabled:text-[var(--color-accent-900)]`,
}

export const SuperButton = (props: PropsType) => {
  const { variant, children, onClick, disabled, asChild } = props

  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      onClick={onClick}
      className={variantStyles[variant]}
      disabled={disabled}
    >
      {children}
    </Comp>
  )
}
