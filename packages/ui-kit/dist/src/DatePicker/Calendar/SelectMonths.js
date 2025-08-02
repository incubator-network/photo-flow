import { jsx as _jsx } from 'react/jsx-runtime'
import { twMerge } from 'tailwind-merge'
import { months } from '../DatePicker'
export const SelectMonths = ({ selectedMonth, onChangeMonthHandler }) => {
  return _jsx('ul', {
    className: 'grid grid-cols-3 gap-2 p-2',
    children: months.map((month, i) => {
      const isSelected = selectedMonth === month
      return _jsx(
        'li',
        {
          onClick: () => onChangeMonthHandler(month),
          className: twMerge(
            'dark:hover:bg-dark-300 rounded-md p-2 text-center transition-colors hover:bg-gray-100',
            isSelected && 'text-accent-500'
          ),
          children: month,
        },
        i
      )
    }),
  })
}
