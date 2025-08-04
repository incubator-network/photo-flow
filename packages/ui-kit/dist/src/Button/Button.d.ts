import { ComponentProps } from 'react'
type PropsType = {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  asChild?: boolean
} & ComponentProps<'button'>
export declare const Button: (props: PropsType) => import('react/jsx-runtime').JSX.Element
export {}
