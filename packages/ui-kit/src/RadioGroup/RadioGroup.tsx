import * as RadioGroup from '@radix-ui/react-radio-group'
import { twMerge } from 'tailwind-merge'

type Item = {
  title: string
  id: string
}

type RadioProps = {
  items: Item[]
  value: string
  onValueChange: (value: string) => void
} & RadioGroup.RadioGroupProps

export const Radio = ({ className, disabled, items, ...restProps }: RadioProps) => (
  <form>
    <RadioGroup.Root
      defaultValue={items[0].title}
      className={twMerge(
        `leading-1.5; text-light-100 flex gap-11 text-sm font-normal`,
        disabled && `text-light-900`,
        className
      )}
      {...restProps}
    >
      {items?.map(item => {
        return (
          <div className={`flex items-center gap-[2px]`} key={item.id}>
            <div
              className={twMerge(
                `hover:bg-dark-300 focus:bg-dark-500 active:bg-dark-100 rounded-full`,
                disabled && `hover:bg-transparent focus:bg-transparent active:bg-transparent`
              )}
            >
              <RadioGroup.Item
                value={item.title}
                id={item.id}
                disabled={disabled}
                className={twMerge(
                  `border-light-100 focus:ring-dark-500 focus:bg-dark-500 m-2 flex h-5 w-5 items-center justify-center rounded-full border-[2px] focus:ring-8 focus:outline-none`,
                  disabled &&
                    `border-dark-100 focus:bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none`
                )}
              >
                <RadioGroup.Indicator
                  className={twMerge(
                    `bg-light-100 h-[10px] w-[10px] rounded-full`,
                    disabled && `bg-dark-100`
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
