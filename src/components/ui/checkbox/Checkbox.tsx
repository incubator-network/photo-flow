import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
// import { CheckIcon } from '@radix-ui/react-icons'
import CheckIcon from '@/assets/icons/checkmark-outline.svg'

type CheckBoxProps = {
  variant?: 'default' | 'active' | 'hover' | 'focus' | 'disabled'
  label?: string
} & ComponentProps<typeof CheckboxPrimitive.Root>

export const Checkbox = ({
  variant = 'default',
  label,
  className,
  id,
  disabled,
  ...rest
}: CheckBoxProps) => {
  const baseStyles = twMerge(
    'relative flex items-center justify-center w-4 h-4 rounded-[2px] border-2 transition-all outline-none hover:before:opacity-10 before:bg-light-300',
    disabled && 'border-light-900',
    variant === 'default' && 'before:bg-white'
  )

  const wrapperClasses = twMerge(
    'relative w-8 h-8 flex items-center justify-center',
    'before:content-[""] before:absolute before:inset-0 before:rounded-full before:opacity-0 before:transition-opacity hover:bg-dark-300 rounded-full active:bg-dark-100 focus-visible:bg-dark-300 focus-visible:outline-none',
    disabled && 'hover:bg-transparent focus:bg-transparent active:bg-transparent'
  )

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <div className={wrapperClasses} tabIndex={0}>
        <CheckboxPrimitive.Root className={baseStyles} id={id} disabled={disabled} {...rest}>
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
