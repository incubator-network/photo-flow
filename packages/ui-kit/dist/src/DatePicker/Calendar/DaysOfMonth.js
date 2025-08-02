import { jsx as _jsx } from 'react/jsx-runtime'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
export const DaysOfMonth = ({
  onDayClick,
  days,
  selectedMap,
  rangeStartStr,
  rangeEndStr,
  isShowCurrentMonth,
}) => {
  return _jsx('ul', {
    className: twMerge(`grid grid-cols-7`, `grid-rows-[${Math.ceil(days.length / 7)}]`),
    children: days.map(day => {
      const dateStr = day.date.toDateString()
      const isSelected = selectedMap.has(dateStr)
      const isRangeStart = dateStr === rangeStartStr
      const isRangeEnd = dateStr === rangeEndStr
      return _jsx(
        'li',
        {
          onClick: () => {
            onDayClick(day.date)
          },
          className: twMerge(
            `focus hover:bg-accent-700 flex h-9 w-9 items-center justify-center hover:rounded-none`,
            (day.dayOfTheWeek === 5 || day.dayOfTheWeek === 6) && `text-danger-300`,
            day.isToday && isShowCurrentMonth && `text-accent-500 font-bold`,
            !day.isCurrentMonth && `text-light-900`,
            isSelected && selectedMap.size === 1 && `bg-accent-900 rounded-full hover:rounded-full`,
            isSelected && selectedMap.size > 1 && `bg-accent-900 hover:bg-accent-700`,
            isRangeStart &&
              selectedMap.size > 1 &&
              `hover:bg-accent-700 rounded-l-full hover:rounded-l-full`,
            isRangeEnd &&
              selectedMap.size > 1 &&
              `hover:bg-accent-700 rounded-r-full hover:rounded-r-full`
          ),
          children: format(day.date, 'd'),
        },
        String(day.date)
      )
    }),
  })
}
