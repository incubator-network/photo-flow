import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'

type CheckBoxProps = {
  variant?: 'default' | 'active' | 'hover' | 'focus' | 'disabled';
  label?: string;
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const SuperCheckBox = ({ variant= 'default', label, className, ...rest }: CheckBoxProps) => {
  const baseStyles = clsx('flex items-center justify-center w-4 h-4 rounded-[2px] border-2 transition-shadow outline-none',
  {
    'bg-[#fff] border-[#fff]': rest.checked,
    'border-[#fff]': !rest.checked,
    'hover:shadow-[0_0_0_6px_#4C4C4C]': variant === 'active' || variant === 'hover',
    'hover:shadow-[0_0_0_6px_#000]': variant === 'focus',
    'opacity-50 cursor-not-allowed': rest.disabled,
  }, className)

  const iconClasses = clsx({
    'text-[#000]': rest.checked,
    'text-gray-50': !rest.checked,
  })

  return (
    <div className="flex items-center gap-2">
      <Checkbox.Root className={baseStyles} {...rest}
      >
        <Checkbox.Indicator>
          {rest.checked && <CheckIcon className={iconClasses} />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && <label className="text-base">{label}</label>}
    </div>
  )
}