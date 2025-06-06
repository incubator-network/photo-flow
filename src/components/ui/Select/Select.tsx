import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

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
  isOpen: boolean
  widthInPx: string
}

export const Select = ({
  onOpenChange,
  placeholder,
  title,
  items,
  disabled,
  isOpen,
  widthInPx: width,
}: PropsType) => {
  const [open, setOpen] = useState(isOpen)
  const [selectedValue, setSelectedValue] = useState(items[0]?.title || '')
  const selectedItem = items.find(item => item.title === selectedValue)

  const getWidthClass = (width: string) => `w-[${width}]`

  console.log(width)
  console.log(`w-[${width}px]`)

  return (
    <div className='relative'>
      {title && (
        <span className='text-regular-14 text-[color:var(--color-light-900)]'>
          {title}
        </span>
      )}

      <RadixSelect.Root
        open={open}
        onOpenChange={() => {
          setOpen(!open)
          onOpenChange?.(open)
        }}
        disabled={disabled}
        value={selectedValue}
        onValueChange={setSelectedValue}
      >
        <RadixSelect.Trigger
          className={twMerge(
            getWidthClass(width),
            `
    bg-[color:var(--color-dark-700)]
    
     h-[36px]
    rounded-xs
    border
    shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
    flex justify-between items-center
    px-3
    py-[6px]
    text-regular-16

    border-[color:var(--color-dark-100)]
    hover:text-[color:var(--color-light-900)]
    focus:border-[color:var(--color-accent-500)]
    focus:border-2
    focus:outline-none

    data-[state=open]:bg-[color:var(--color-dark-500)]
    data-[state=open]:border-[color:var(--color-light-100)]
    data-[state=open]:rounded-none
  `,
            disabled &&
              `
            text-[color:var(--color-dark-100)]
            border-[color:var(--color-dark-100)]
            hover:text-[color:var(--color-dark-100)]
  `,

            title && 'text-[color:var(--color-light-900)]'
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
            placeholder && <RadixSelect.Value placeholder={placeholder} />
          )}
          <RadixSelect.Icon
            className={twMerge(
              `w-6 h-6  transition-transform  duration-200`,
              open && 'rotate-180 ',
              !placeholder && 'ml-auto'
            )}
          >
            <ChevronDownIcon
              className={twMerge(`w-6 h-6 text-[color:var(--color-light-100)]`)}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className={twMerge(getWidthClass(width),`
            w-[${width}px]
            shadow
            border 
            rounded-xs
            data-[state=open]:rounded-none
            overflow-hidden
            `)}
            position='popper'
            align='start'
            avoidCollisions={false}
          >
            <RadixSelect.Viewport>
              {items.map(item => {
                return (
                  <RadixSelect.Item
                    value={item.title}
                    className={twMerge(getWidthClass(width),`
                      outline-none 
                      border-none 
                      text-[color:var(--color-light-100)]
                      bg-[color:var(--color-dark-500)]
                      h-[36px]
                      flex justify-between items-center
                      px-3
                      py-[6px]
                      hover:text-[color:var(--color-accent-500)]
                      hover:bg-[color:var(--color-dark-300)]
                              `)}
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
