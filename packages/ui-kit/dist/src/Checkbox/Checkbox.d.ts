import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { ComponentProps } from 'react'
type CheckBoxProps = {
  variant?: 'default' | 'active' | 'hover' | 'focus' | 'disabled'
  label?: string
} & ComponentProps<typeof CheckboxPrimitive.Root>
export declare const Checkbox: ({
  variant,
  label,
  className,
  id,
  disabled,
  ...rest
}: CheckBoxProps) => import('react/jsx-runtime').JSX.Element
export {}
