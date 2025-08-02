'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { Calendar } from './Calendar/Calendar'
import { twMerge } from 'tailwind-merge'
import { useEffect, useRef, useState } from 'react'
import { getCalendarPositionStyles, getDaysForCalendar } from './utils'
import { useCalendarSelection } from './hooks/useCalendarSelection'
import { ButtonTrigger } from './ButtonTrigger'
import { format } from 'date-fns'
export const normalizeDateToMidnightUTC = date => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString()
}
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
export const DatePicker = ({
  className,
  disabled,
  error,
  onDatesChange,
  title,
  isOnlySingleMode,
  onValueChange,
  defaultDate,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [days, setDays] = useState([])
  const [offsetMonths, setOffsetMonths] = useState(0)
  const calendarRef = useRef(null)
  const openButtonRef = useRef(null)
  const { onDayClick, selectionDates, rangeStart, rangeEnd, mode, today } =
    useCalendarSelection(isOnlySingleMode)
  const buttonPosition = openButtonRef.current?.getBoundingClientRect()
  const calendarPosition = getCalendarPositionStyles(buttonPosition)
  const [selectedYear, setSelectedYear] = useState(format(today, 'yyyy'))
  const [selectedMonth, setSelectedMonth] = useState(format(today, 'MMM'))
  const getSelectedMonth = month => {
    return months.findIndex(m => m === month)
  }
  useEffect(() => {
    setDays(
      getDaysForCalendar({
        offsetMonths,
        selectedYear,
        indexOfSelectedMonth: getSelectedMonth(selectedMonth),
      })
    )
    onDatesChange?.(selectionDates)
    if (isOnlySingleMode) {
      onValueChange?.(selectionDates[0] || null)
    }
  }, [
    offsetMonths,
    selectionDates,
    onDatesChange,
    onValueChange,
    isOnlySingleMode,
    selectedYear,
    selectedMonth,
  ])
  useEffect(() => {
    const handleClickOutside = e => {
      if (
        isOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !openButtonRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])
  const goToNextMonth = () => {
    setSelectedYear('')
    setSelectedMonth('')
    setOffsetMonths(prev => prev + 1)
  }
  const goToPrevMonth = () => {
    setSelectedYear('')
    setSelectedMonth('')
    setOffsetMonths(prev => prev - 1)
  }
  return _jsxs('div', {
    className: twMerge(`leading-1.5 font-normal`, className),
    children: [
      title && _jsx('p', { className: `text-light-900 text-sm`, children: title }),
      _jsx(ButtonTrigger, {
        isOpen: isOpen,
        disabled: disabled,
        rangeStart: rangeStart || null,
        rangeEnd: rangeEnd || null,
        mode: mode,
        onHandleClick: () => setIsOpen(!isOpen),
        selectionDates: selectionDates || null,
        openButtonRef: openButtonRef,
        defaultDate: defaultDate ? defaultDate : normalizeDateToMidnightUTC(today),
      }),
      error?.isError
        ? isOpen
          ? _jsx('p', {
              className: `text-danger-500 text-xs leading-[1.33333] font-normal`,
              children: 'Error, select current month or last month',
            })
          : _jsx('p', {
              className: `text-danger-500 text-xs leading-[1.33333] font-normal`,
              children: error.errorText || 'Error! ',
            })
        : isOpen &&
          _jsx('div', {
            ref: calendarRef,
            className: twMerge(
              `absolute z-1000 w-[300px]`,
              calendarPosition.top,
              calendarPosition.left
            ),
            children: _jsx(Calendar, {
              onDayClick: onDayClick,
              mode: mode,
              selectionDates: selectionDates,
              rangeStart: rangeStart,
              rangeEnd: rangeEnd,
              today: today,
              days: days,
              goToNextMonth: goToNextMonth,
              goToPrevMonth: goToPrevMonth,
              offsetMonths: offsetMonths,
              selectedYear: selectedYear,
              setSelectedYear: setSelectedYear,
              selectedMonth: selectedMonth,
              setSelectedMonth: setSelectedMonth,
            }),
          }),
    ],
  })
}
