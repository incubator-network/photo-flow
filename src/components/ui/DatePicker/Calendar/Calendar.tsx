import ArrowLeft from '../../../../assets/Arrow left.svg'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

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

  return (
    <div
      className={`
    border 
    border-dark-300 
    rounded-sm 
    w-[300px] 
    h-[348px]
    bg-dark-500
      font-normal 
      leading-6 
      text-base 
      text-light-100
      py-4
      px-6
      flex
      gap-3
      flex-col
      mt-0.5
      text-center 
    `}
    >
      <div className={`flex justify-between items-center`}>
        <p className={`font-bold`}>{format(dayToday, 'MMMM yyyy')}</p>
        <div className={`flex gap-0.5`}>
          <button
            className={`
              flex
              items-center
              justify-center
              bg-dark-100
              rounded-3xl
              p-2
              w-9
              h-9
            `}
          >
            <ArrowLeft className={`text-light-100 w-5 h-5`} />
          </button>
          <button
            className={`
              flex
              items-center
              justify-center
              bg-dark-100
              rounded-3xl
              p-2
              w-9
              h-9
            `}
          >
            <ArrowLeft
              className={`text-light-100 w-5 h-5 transform rotate-180`}
            />
          </button>
        </div>
      </div>

      <ul className={`flex text-dark-100 items-center justify-center`}>
        {weekDays.map((wd, i) => {
          return (
            <li
              key={i}
              className={`w-[36px] h-[40px] flex justify-center items-center`}
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
          return (
            <li
              key={String(day.date)}
              className={twMerge(
                `
            flex
            justify-center
            items-center
            h-9
            w-9
            `,
                (day.dayOfTheWeek === 5 || day.dayOfTheWeek === 6) &&
                  `text-danger-300`,
                day.isToday && `font-bold text-accent-500`,
                !day.isCurrentMonth && `text-light-900`
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
