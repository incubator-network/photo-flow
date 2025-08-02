'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import ArrowLeft from '@/assets/icons/arrow-back-outline.svg'
import { addMonths, format } from 'date-fns'
import { useMemo, useState } from 'react'
import { WeekDays } from './WeekDays'
import { DaysOfMonth } from './DaysOfMonth'
import { Input } from '../../Input/Input'
import { SelectMonths } from './SelectMonths'
export const Calendar = ({
  today,
  days,
  selectionDates,
  onDayClick,
  rangeStart,
  rangeEnd,
  goToNextMonth,
  goToPrevMonth,
  offsetMonths,
  selectedMonth,
  selectedYear,
  setSelectedYear,
  setSelectedMonth,
}) => {
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const [isOpenCalendar, setIsOpenCalendar] = useState(true)
  const [isOpenSelectYears, setIsOpenSelectYears] = useState(false)
  const [isOpenSelectMonths, setIsOpenSelectMonths] = useState(false)
  const selectedMap = useMemo(() => {
    return new Set(selectionDates.map(d => d.toDateString()))
  }, [selectionDates])
  const rangeStartStr = rangeStart?.toDateString() ?? ''
  const rangeEndStr = rangeEnd?.toDateString() ?? ''
  const isShowCurrentMonth =
    format(addMonths(today, offsetMonths), 'MMM yyyy') === format(today, 'MMM yyyy')
  const onClickYearsHandler = () => {
    setIsOpenCalendar(false)
    setIsOpenSelectMonths(false)
    setIsOpenSelectYears(true)
  }
  const onClickMonthsHandler = () => {
    setIsOpenCalendar(false)
    setIsOpenSelectYears(false)
    setIsOpenSelectMonths(true)
  }
  const onChangeMonthHandler = month => {
    setSelectedMonth(month)
    setIsOpenSelectMonths(false)
    setIsOpenCalendar(true)
  }
  const onChangeYearHandler = e => {
    const newValue = e.target.value
    if (/^\d{0,4}$/.test(newValue)) {
      setSelectedYear(newValue)
    }
    if (newValue.length === 4) {
      setIsOpenSelectMonths(true)
      setIsOpenSelectYears(false)
    }
  }
  return _jsxs('div', {
    className: `border-dark-300 bg-dark-500 text-light-100 mt-0.5 flex w-[300px] flex-col gap-3 rounded-sm border px-6 py-4 text-center text-base leading-6 font-normal`,
    children: [
      _jsxs('div', {
        className: `flex items-center justify-between`,
        children: [
          _jsxs('div', {
            className: 'flex gap-1',
            children: [
              _jsx('p', {
                className: `font-bold`,
                onClick: onClickMonthsHandler,
                children: selectedMonth
                  ? selectedMonth
                  : format(addMonths(today, offsetMonths), 'MMM'),
              }),
              _jsx('p', {
                className: `font-bold`,
                onClick: onClickYearsHandler,
                children:
                  selectedYear.length === 4
                    ? selectedYear
                    : format(addMonths(today, offsetMonths), 'yyyy'),
              }),
            ],
          }),
          _jsxs('div', {
            className: `flex gap-0.5`,
            children: [
              _jsx('button', {
                type: 'button',
                className: `bg-dark-100 flex h-9 w-9 items-center justify-center rounded-3xl p-2`,
                children: _jsx(ArrowLeft, {
                  className: `text-light-100 h-5 w-5`,
                  onClick: goToPrevMonth,
                }),
              }),
              _jsx('button', {
                type: 'button',
                className: `bg-dark-100 flex h-9 w-9 items-center justify-center rounded-3xl p-2`,
                children: _jsx(ArrowLeft, {
                  onClick: goToNextMonth,
                  className: `text-light-100 h-5 w-5 rotate-180 transform`,
                }),
              }),
            ],
          }),
        ],
      }),
      isOpenSelectYears &&
        _jsx(Input, {
          label: 'Input year',
          value: selectedYear,
          onChange: e => {
            onChangeYearHandler(e)
          },
        }),
      isOpenSelectMonths &&
        _jsx(SelectMonths, {
          selectedMonth: selectedMonth,
          onChangeMonthHandler: onChangeMonthHandler,
        }),
      isOpenCalendar &&
        _jsxs('div', {
          className: 'flex flex-col gap-3',
          children: [
            _jsx(WeekDays, { weekDays: weekDays }),
            _jsx(DaysOfMonth, {
              onDayClick: onDayClick,
              days: days,
              selectedMap: selectedMap,
              rangeStartStr: rangeStartStr,
              rangeEndStr: rangeEndStr,
              isShowCurrentMonth: isShowCurrentMonth,
            }),
          ],
        }),
    ],
  })
}
