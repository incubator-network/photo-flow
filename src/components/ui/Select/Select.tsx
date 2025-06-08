import * as RadixSelect from '@radix-ui/react-select'
import { twMerge } from 'tailwind-merge'
import { ComponentProps, useState } from 'react'
import ArrowDown from '../../../assets/arrow-down.svg'

type Item = {
  title: string
  path?: string
  description?: string
}

type PropsType = {
  variant?: 'Default' | 'Active'
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  title?: string
  items: Item[]
  disabled?: boolean
  contentClassName: string
} & Omit<
  ComponentProps<'select'>,
  'value' | 'defaultValue' | 'onChange' | 'dir'
>

export const Select = ({
  onOpenChange,
  placeholder,
  title,
  items,
  disabled,
  className,
  contentClassName,
  ...restProps
}: PropsType) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(items[0]?.title || '')
  const selectedItem = items.find(item => item.title === selectedValue)

  return (
    <div className={twMerge(`relative`, className)}>
      {title && <span className='text-regular-14 text-light-900'>{title}</span>}

      <RadixSelect.Root
        open={open}
        onOpenChange={() => {
          setOpen(!open)
          onOpenChange?.(open)
        }}
        disabled={disabled}
        value={selectedValue}
        onValueChange={setSelectedValue}
        {...restProps}
      >
        <RadixSelect.Trigger
          className={twMerge(
            `
            w-full
            bg-dark-700
            h-[36px]
            rounded-xs
            border
            shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
            flex justify-between items-center
            px-3
            py-[6px]
            text-regular-16

            border-dark-100
            hover:text-light-900
            focus:border-accent-500
            focus:border-2
            focus:outline-none

            data-[state=open]:bg-dark-500
            data-[state=open]:border-light-100
            data-[state=open]:rounded-none
          `,
            disabled &&
              `
            text-dark-100
            border-dark-100
            hover:text-dark-100
  `,

            title && 'text-light-900'
          )}
        >
          {selectedItem?.path && placeholder ? (
            <div className='flex items-center gap-3'>
              <RadixSelect.Icon>
                <img src={selectedItem.path} alt={selectedItem.description} />
              </RadixSelect.Icon>
              <span>{selectedItem.title}</span>
            </div>
          ) : selectedItem?.path && !placeholder ? (
            <div className='flex items-center gap-3'>
              <RadixSelect.Icon>
                <img src={selectedItem.path} alt={selectedItem.description} />
              </RadixSelect.Icon>
            </div>
          ) : (
            <RadixSelect.Value placeholder={placeholder} className='block' />
          )}
          <RadixSelect.Icon
            className={twMerge(
              `
              block
              w-6 h-6  transition-transform  duration-200`,
              open && 'rotate-180 ',
              !placeholder && 'ml-auto'
            )}
          >
            <ArrowDown className={`fill-light-100 w-6 h-6 text-light-100`} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className={twMerge(
              `
              shadow
              border 
              rounded-xs
              data-[state=open]:rounded-none
              overflow-hidden
              data-[state=open]:hover:bg-accent-500
              `,
              contentClassName
            )}
            position='popper'
            align='start'
            avoidCollisions={false}
          >
            <RadixSelect.Viewport>
              {items.map(item => {
                return (
                  <RadixSelect.Item
                    value={item.title}
                    className={twMerge(
                      `
                      w-full
                      outline-none 
                      border-none 
                      text-light-100
                      bg-dark-500
                      h-[36px]
                      flex justify-between items-center
                      px-3
                      py-[6px]
                      hover:text-accent-500
                      hover:bg-dark-300
                      
                        `
                    )}
                    key={item.title}
                  >
                    {item.path ? (
                      <div className='flex items-center gap-3'>
                        <RadixSelect.Icon>
                          <img src={item.path} alt={item.description} />
                        </RadixSelect.Icon>

                        <RadixSelect.ItemText>
                          {item.title}
                        </RadixSelect.ItemText>
                      </div>
                    ) : (
                      <RadixSelect.ItemText>{item.title}</RadixSelect.ItemText>
                    )}
                  </RadixSelect.Item>
                )
              })}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}
