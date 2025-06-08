import OpenedCalendarIcon from '@/assets/calendar-opened.svg'
import ClosedCalendarIcon from '@/assets/calendar-closed.svg'
import { Calendar } from './Calendar/Calendar'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { startOfToday } from 'date-fns/startOfToday'
import { format } from 'date-fns'
import { getDaysForCalendar } from './utils/getDaysForCalendar'

type DatePickerProps = {
  className?: string
}

export const DatePicker = ({ className }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const disabled = false // Имитация disabled
  const isError = false // Получение ошибки
  const dateIsSelected = false // Переделать на получение даты или ренджей
  const days = getDaysForCalendar()
  const dayToday = startOfToday()

  return (
    <div
      className={twMerge(
        `
      leading-1.5
      font-normal
        `,
        className
      )}
    >
      <p
        className={`
        text-sm
        text-light-900
        `}
      >
        Date
      </p>
      <button
        disabled={disabled}
        className={twMerge(
          `
        h-[36px]
        border
        border-dark-300
        rounded-sm
        p-[6px_12px]
        bg-dark-700
        py-1.5 px-3
        inline-flex
        gap-6
        items-center
        text-light-100
        

        hover:bg-dark-500
        hover:border-dark-100

        focus:border-accent-700
        focus:border-2

        disabled:text-light-900
        disabled:bg-dark-500
        disabled:border-dark-300
        `,
          isOpen && `bg-dark-500`,
          isError &&
            `
          bg-dark-500
          border-danger-500
          text-danger-500
          
          `,
          dateIsSelected && `bg-dark-500`
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{format(dayToday, 'dd/MM/yyyy')}</p>

        {isOpen ? (
          <OpenedCalendarIcon className={`h-6 w-6`} />
        ) : (
          <ClosedCalendarIcon
            className={twMerge(
              `text-light-100 h-6 w-6`,
              isError && ` text-danger-500`
            )}
          />
        )}
      </button>
      {isError ? (
        isOpen ? (
          <p
            className={`font-normal text-xs leading-[1.33333] text-danger-500`}
          >
            Error, select current month or last month
          </p>
        ) : (
          <p
            className={`font-normal text-xs leading-[1.33333] text-danger-500`}
          >
            Error!
          </p>
        )
      ) : (
        isOpen && <Calendar dayToday={dayToday} days={days} />
      )}
    </div>
  )
}
