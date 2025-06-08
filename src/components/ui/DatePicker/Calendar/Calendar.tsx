import ArrowLeft from '../../../../assets/Arrow left.svg'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { useCalendarSelection } from '../utils/useCalendarSelection'
import { useMemo } from 'react'

type DayType = {
  date: Date
  isToday: boolean
  dayOfTheWeek: number
  isCurrentMonth: boolean
}

type CalendarProps = {
  dayToday: Date
  days: DayType[]
}

export const Calendar = ({ dayToday, days }: CalendarProps) => {
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  const { onDayClick, selectionDates, rangeStart, rangeEnd } =
    useCalendarSelection()

  const selectedMap = useMemo(() => {
    return new Set(selectionDates.map(d => d.toDateString()))
  }, [selectionDates])

  const rangeStartStr = rangeStart?.toDateString() ?? ''
  const rangeEndStr = rangeEnd?.toDateString() ?? ''

  return (
    <div
      className={`border-dark-300 bg-dark-500 text-light-100 mt-0.5 flex h-[348px] w-[300px] flex-col gap-3 rounded-sm border px-6 py-4 text-center text-base leading-6 font-normal`}
    >
      <div className={`flex items-center justify-between`}>
        <p className={`font-bold`}>{format(dayToday, 'MMMM yyyy')}</p>
        <div className={`flex gap-0.5`}>
          <button
            className={`bg-dark-100 flex h-9 w-9 items-center justify-center rounded-3xl p-2`}
          >
            <ArrowLeft className={`text-light-100 h-5 w-5`} />
          </button>
          <button
            className={`bg-dark-100 flex h-9 w-9 items-center justify-center rounded-3xl p-2`}
          >
            <ArrowLeft
              className={`text-light-100 h-5 w-5 rotate-180 transform`}
            />
          </button>
        </div>
      </div>

      <ul className={`text-dark-100 flex items-center justify-center`}>
        {weekDays.map((wd, i) => {
          return (
            <li
              key={i}
              className={`flex h-[40px] w-[36px] items-center justify-center`}
            >
              {wd}
            </li>
          )
        })}
      </ul>

      <ul
        className={twMerge(
          `grid grid-cols-7`,
          days.length === 42 && `grid-rows-6`,
          days.length === 35 && `grid-rows-5`,
          days.length === 28 && `grid-rows-4`
        )}
      >
        {days.map(day => {
          const dateStr = day.date.toDateString()
          const isSelected = selectedMap.has(dateStr)
          const isRangeStart = dateStr === rangeStartStr
          const isRangeEnd = dateStr === rangeEndStr

          return (
            <li
              key={String(day.date)}
              onClick={() => {
                onDayClick(day.date)
              }}
              className={twMerge(
                `flex h-9 w-9 items-center justify-center`,
                (day.dayOfTheWeek === 5 || day.dayOfTheWeek === 6) &&
                  `text-danger-300`,
                day.isToday && `text-accent-500 font-bold`,
                !day.isCurrentMonth && `text-light-900`,
                isSelected &&
                  selectedMap.size === 1 &&
                  `bg-accent-900 rounded-full`,
                isSelected && selectedMap.size > 1 && `bg-accent-900`,
                isRangeStart && selectedMap.size > 1 && `rounded-l-full`,
                isRangeEnd && selectedMap.size > 1 && `rounded-r-full`
              )}
            >
              {format(day.date, 'd')}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
