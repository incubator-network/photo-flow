import OpenedCalendarIcon from '@/assets/calendar-opened.svg'
import ClosedCalendarIcon from '@/assets/calendar-closed.svg'
import { Calendar } from './Calendar/Calendar'
import { twMerge } from 'tailwind-merge'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { CalendarDay, getDaysForCalendar } from './utils/getDaysForCalendar'
import { useCalendarSelection } from './utils/useCalendarSelection'

type DatePickerProps = {
  className?: string
  disabled?: boolean
  error?: { isError: boolean; errorText?: string }
  onDatesChange?: (dates: Date[]) => void
}

export const DatePicker = ({
  className,
  disabled,
  error,
  onDatesChange,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [days, setDays] = useState<CalendarDay[]>([])
  const [offsetMonths, setOffsetMonths] = useState<number>(0)

  const calendarRef = useRef<HTMLDivElement>(null)

  const { onDayClick, selectionDates, rangeStart, rangeEnd, mode, today } =
    useCalendarSelection()

  useEffect(() => {
    setDays(getDaysForCalendar(offsetMonths))
    onDatesChange?.(selectionDates)
  }, [offsetMonths, selectionDates, onDatesChange])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const goToNextMonth = () => setOffsetMonths(prev => prev + 1)
  const goToPrevMonth = () => setOffsetMonths(prev => prev - 1)

  return (
    <div className={twMerge(`leading-1.5 font-normal`, className)}>
      <p className={`text-light-900 text-sm`}>Date</p>
      <button
        disabled={disabled}
        className={twMerge(
          `border-dark-300 bg-dark-700 text-light-100 hover:bg-dark-500 hover:border-dark-100 disabled:text-light-900 disabled:bg-dark-500 disabled:border-dark-300 inline-flex h-[36px] items-center gap-6 rounded-sm border p-[6px_12px] px-3 py-1.5 disabled:border`,
          isOpen && `bg-dark-500 border`,
          !isOpen &&
            `focus:border-accent-700 focus:border-2 focus:outline-none`,
          error?.isError && `bg-dark-500 border-danger-500 text-danger-500`,
          mode === 'range' && !isOpen && `bg-dark-500`
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {mode === 'range' && rangeStart && rangeEnd && (
          <p>
            {format(rangeStart, 'dd/MM/yyyy')} -{' '}
            {format(rangeEnd, 'dd/MM/yyyy')}
          </p>
        )}
        {mode === 'single' && selectionDates.length === 1 && (
          <p>{format(selectionDates[0], 'dd/MM/yyyy')}</p>
        )}
        {!selectionDates.length && <p>{format(today, 'dd/MM/yyyy')}</p>}

        {isOpen ? (
          <OpenedCalendarIcon className={`h-6 w-6`} />
        ) : (
          <ClosedCalendarIcon
            className={twMerge(
              `text-light-100 h-6 w-6`,
              error?.isError && `text-danger-500`
            )}
          />
        )}
      </button>
      {error?.isError ? (
        isOpen ? (
          <p
            className={`text-danger-500 text-xs leading-[1.33333] font-normal`}
          >
            Error, select current month or last month
          </p>
        ) : (
          <p
            className={`text-danger-500 text-xs leading-[1.33333] font-normal`}
          >
            {error.errorText || 'Error! '}
          </p>
        )
      ) : (
        isOpen && (
          <div ref={calendarRef} className={`w-[300px]`}>
            <Calendar
              onDayClick={onDayClick}
              mode={mode}
              selectionDates={selectionDates}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              today={today}
              days={days}
              goToNextMonth={goToNextMonth}
              goToPrevMonth={goToPrevMonth}
              offsetMonths={offsetMonths}
            />
          </div>
        )
      )}
    </div>
  )
}
