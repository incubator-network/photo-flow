import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CheckBoxProps = {
  variant?: 'default' | 'active' | 'hover' | 'focus' | 'disabled'
  label?: string
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckBox = ({
  variant = 'default',
  label,
  className,
  checked,
  ...rest
}: CheckBoxProps) => {
  const isInteractive = variant === 'active' || variant === 'hover'
  const isFocus = variant === 'focus'
  const isDisabled = variant === 'disabled'

  const baseStyles = twMerge(
    'relative z-10 flex items-center justify-center w-4 h-4 rounded-[2px] border-2 transition-shadow outline-none',

    checked ? 'bg-[#fff] border-[#fff]' : 'border-[#fff]',
    isDisabled ? 'bg-dark-100 border-light-900' : '',
    className
  )

  const iconClasses = twMerge(
    checked ? 'text-light-700' : 'text-dark-900',
    isDisabled ? 'text-light-700' : 'text-dark-900'
  )

  const wrapperClasses = twMerge(
    'relative w-8 h-8 flex items-center justify-center',
    isInteractive
      ? 'before:content-[""] before:absolute before:inset-0 before:rounded-full before:bg-dark-100'
      : '',
    isFocus
      ? 'before:content-[""] before:absolute before:inset-0 before:rounded-full before:bg-dark-500'
      : ''
  )
  return (
    <div className='flex items-center gap-2'>
      <div className={wrapperClasses}>
        <Checkbox.Root
          className={baseStyles}
          checked={checked}
          disabled={rest.disabled}
          {...rest}
        >
          <Checkbox.Indicator>
            {checked && <CheckIcon className={iconClasses} />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>

      {label && <label className='text-base'>{label}</label>}
    </div>
  )
}
