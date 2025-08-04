import { TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number
  placeholder?: string
  className: string
  value?: string
  changeValue?: (value: string) => void
  textareaLabel?: string
  error?: string | null
  register?: UseFormRegisterReturn
}
export declare const Textarea: import('react').MemoExoticComponent<
  ({
    maxLength,
    placeholder,
    className,
    value,
    changeValue,
    textareaLabel,
    error,
    onBlur,
    onFocus,
    register,
    ...props
  }: TextareaProps) => import('react/jsx-runtime').JSX.Element
>
export {}
