import { Calendar } from './Calendar/Calendar'
import { twMerge } from 'tailwind-merge'
import { useEffect, useRef, useState } from 'react'
import { CalendarDay, getDaysForCalendar } from './utils/getDaysForCalendar'
import { useCalendarSelection } from './utils/useCalendarSelection'
import { getCalendarPositionStyles } from './utils/getCalendarPosition'
import { ButtonTrigger } from './ButtonTrigger'

type DatePickerProps = {
  className?: string
  disabled?: boolean
  error?: { isError: boolean; errorText?: string }
  onDatesChange?: (dates: Date[]) => void
  title?: string
  isOnlySingleMode?: true
}

export const DatePicker = ({
  className,
  disabled,
  error,
  onDatesChange,
  title,
  isOnlySingleMode,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [days, setDays] = useState<CalendarDay[]>([])
  const [offsetMonths, setOffsetMonths] = useState<number>(0)

  const calendarRef = useRef<HTMLDivElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  const { onDayClick, selectionDates, rangeStart, rangeEnd, mode, today } =
    useCalendarSelection(isOnlySingleMode)
  const buttonPosition = openButtonRef.current?.getBoundingClientRect()
  const calendarPosition = getCalendarPositionStyles(buttonPosition)

  useEffect(() => {
    setDays(getDaysForCalendar(offsetMonths))
    onDatesChange?.(selectionDates)
  }, [offsetMonths, selectionDates, onDatesChange])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        !openButtonRef.current?.contains(e.target as Node)
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
      {title && <p className={`text-light-900 text-sm`}>{title}</p>}
      <ButtonTrigger
        isOpen={isOpen}
        disabled={disabled}
        rangeStart={rangeStart || null}
        rangeEnd={rangeEnd || null}
        mode={mode}
        onHandleClick={() => setIsOpen(!isOpen)}
        selectionDates={selectionDates || null}
        today={today}
        openButtonRef={openButtonRef}
      />
      {error?.isError ? (
        isOpen ? (
          <p className={`text-danger-500 text-xs leading-[1.33333] font-normal`}>
            Error, select current month or last month
          </p>
        ) : (
          <p className={`text-danger-500 text-xs leading-[1.33333] font-normal`}>
            {error.errorText || 'Error! '}
          </p>
        )
      ) : (
        isOpen && (
          <div
            ref={calendarRef}
            className={twMerge(
              `absolute z-1000 w-[300px]`,
              calendarPosition.top,
              calendarPosition.left
            )}
          >
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
