import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CheckIcon } from '@radix-ui/react-icons'

// import CheckIcon from '@/assets/icons/checkmark-outline.svg'

type CheckBoxProps = {
  variant?: 'default' | 'active' | 'hover' | 'focus' | 'disabled'
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export const Checkbox = ({
  variant = 'default',
  label,
  className,
  id,
  disabled,
  ...rest
}: CheckBoxProps) => {
  const baseStyles = twMerge(
    'relative z-10 flex items-center justify-center w-4 h-4 rounded-[2px] border-2 transition-all outline-none',
    variant === 'default' && 'before:bg-white',
    className
  )

  const wrapperClasses = twMerge(
    'relative w-8 h-8 flex items-center justify-center',
    'before:content-[""] before:absolute before:inset-0 before:rounded-full before:opacity-0 before:transition-opacity',
    variant === 'active' && 'before:opacity-10 before:bg-light-100',
    variant === 'hover' && 'hover:before:opacity-10 before:bg-light-300',
    variant === 'focus' && 'before:opacity-25 before:bg-dark-700',
    variant === 'disabled' && 'opacity-50'
  )

  return (
    <div className='flex items-center gap-1'>
      <div className={wrapperClasses}>
        <CheckboxPrimitive.Root
          defaultChecked
          className={baseStyles}
          id={id}
          {...rest}
          disabled={disabled}
        >
          <CheckboxPrimitive.Indicator>
            <CheckIcon className='text-dark-900 bg-light-100' />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>

      {label && (
        <label
          htmlFor={id}
          className={
            disabled
              ? 'text-light-700 text-regular-14 cursor-pointer'
              : 'text-light-700 text-regular-14'
          }
        >
          {label}
        </label>
      )}
    </div>
  )
}
