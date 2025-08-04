import { twMerge } from 'tailwind-merge'
import { months } from '../DatePicker'

type SelectMonthsPropsType = {
  selectedMonth: string
  onChangeMonthHandler: (month: string) => void
}

export const SelectMonths = ({ selectedMonth, onChangeMonthHandler }: SelectMonthsPropsType) => {
  return (
    <ul className='grid grid-cols-3 gap-2 p-2'>
      {months.map((month, i) => {
        const isSelected = selectedMonth === month
        return (
          <li
            onClick={() => onChangeMonthHandler(month)}
            className={twMerge(
              'dark:hover:bg-dark-300 rounded-md p-2 text-center transition-colors hover:bg-gray-100',
              isSelected && 'text-accent-500'
            )}
            key={i}
          >
            {month}
          </li>
        )
      })}
    </ul>
  )
}
