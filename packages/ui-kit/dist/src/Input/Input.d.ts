import React, { ReactElement } from 'react'
type InputVariant = 'default' | 'disabled' | 'error'
export declare const Input: React.ForwardRefExoticComponent<
  React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: InputVariant
    errorText?: string | null
    disabled?: boolean
    label?: string | ReactElement
  } & React.RefAttributes<HTMLInputElement>
>
export {}
