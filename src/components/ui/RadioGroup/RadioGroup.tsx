import * as React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { twMerge } from 'tailwind-merge'

type Item = {
  title: string
  id: string
}

type RadioProps = {
  items: Item[]
} & RadioGroup.RadioGroupProps

export const Radio = ({
  className,
  disabled,
  items,
  ...restProps
}: RadioProps) => (
  <form>
    <RadioGroup.Root
      defaultValue={items[0].title}
      className={twMerge(
        `
      font-normal
      text-sm
      leading-1.5;
      text-light-100
      flex
      gap-11
      
      `,
        disabled &&
          `
      text-light-900
      `,
        className
      )}
      {...restProps}
    >
      {items?.map(item => {
        return (
          <div className={`flex items-center gap-[2px]`} key={item.id}>
            <div
              className={twMerge(
                `
              rounded-full
              hover:bg-dark-300
              focus:bg-dark-500
              active:bg-dark-100
              
              `,
                disabled &&
                  `
                  hover:bg-transparent
                  focus:bg-transparent
                  active:bg-transparent
                  `
              )}
            >
              <RadioGroup.Item
                value={item.title}
                id={item.id}
                disabled={disabled}
                className={twMerge(
                  `
                      w-5 h-5
                      rounded-full
                      border-[2px]
                      border-light-100
                      flex
                      items-center
                      justify-center
                      m-2
                        focus:outline-none
                        focus:ring-8
                        focus:ring-dark-500
                        focus:bg-dark-500
                      `,
                  disabled &&
                    `
                    border-dark-100
                    focus:outline-none
                    focus:ring-0
                    focus:ring-transparent
                    focus:bg-transparent
                    `
                )}
              >
                <RadioGroup.Indicator
                  className={twMerge(
                    `
                      w-[10px] 
                      h-[10px] 
                      bg-light-100 
                      rounded-full
                      
                    `,
                    disabled &&
                      `
                      bg-dark-100
                    `
                  )}
                />
              </RadioGroup.Item>
            </div>
            <label htmlFor={item.id}>{item.title}</label>
          </div>
        )
      })}
    </RadioGroup.Root>
  </form>
)
