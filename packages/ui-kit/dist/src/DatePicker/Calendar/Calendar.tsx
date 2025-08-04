'use client'
import ArrowLeft from '../../icons/arrow-back-outline.svg'
import { addMonths, format } from 'date-fns'
import { ChangeEvent, useMemo, useState } from 'react'
import { WeekDays } from './WeekDays'
import { DaysOfMonth } from './DaysOfMonth'
import { Input } from '../../Input/Input'
import { SelectMonths } from './SelectMonths'

export type DayType = {
  date: Date
  isToday: boolean
  dayOfTheWeek: number
  isCurrentMonth: boolean
}

type CalendarProps = {
  today: Date
  days: DayType[]
  selectionDates: Date[]
  onDayClick: (day: Date) => void
  mode: 'single' | 'range'
  rangeStart: Date | null
  rangeEnd: Date | null
  goToNextMonth: () => void
  goToPrevMonth: () => void
  offsetMonths: number
  selectedMonth: string
  selectedYear: string
  setSelectedYear: (year: string) => void
  setSelectedMonth: (month: string) => void
}

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
}: CalendarProps) => {
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

  const onChangeMonthHandler = (month: string) => {
    setSelectedMonth(month)
    setIsOpenSelectMonths(false)
    setIsOpenCalendar(true)
  }

  const onChangeYearHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (/^\d{0,4}$/.test(newValue)) {
      setSelectedYear(newValue)
    }

    if (newValue.length === 4) {
      setIsOpenSelectMonths(true)
      setIsOpenSelectYears(false)
    }
  }

  return (
    <div
      className={`border-dark-300 bg-dark-500 text-light-100 mt-0.5 flex w-[300px] flex-col gap-3 rounded-sm border px-6 py-4 text-center text-base leading-6 font-normal`}
    >
      <div className={`flex items-center justify-between`}>
        <div className='flex gap-1'>
          <p className={`font-bold`} onClick={onClickMonthsHandler}>
            {selectedMonth ? selectedMonth : format(addMonths(today, offsetMonths), 'MMM')}
          </p>
          <p className={`font-bold`} onClick={onClickYearsHandler}>
            {selectedYear.length === 4
              ? selectedYear
              : format(addMonths(today, offsetMonths), 'yyyy')}
          </p>
        </div>
        <div className={`flex gap-0.5`}>
          <button
            type='button'
            className={`bg-dark-100 flex h-9 w-9 items-center justify-center rounded-3xl p-2`}
          >
            <ArrowLeft className={`text-light-100 h-5 w-5`} onClick={goToPrevMonth} />
          </button>
          <button
            type='button'
            className={`bg-dark-100 flex h-9 w-9 items-center justify-center rounded-3xl p-2`}
          >
            <ArrowLeft
              onClick={goToNextMonth}
              className={`text-light-100 h-5 w-5 rotate-180 transform`}
            />
          </button>
        </div>
      </div>

      {isOpenSelectYears && (
        <Input
          label='Input year'
          value={selectedYear}
          onChange={e => {
            onChangeYearHandler(e)
          }}
        />
      )}

      {isOpenSelectMonths && (
        <SelectMonths selectedMonth={selectedMonth} onChangeMonthHandler={onChangeMonthHandler} />
      )}

      {isOpenCalendar && (
        <div className='flex flex-col gap-3'>
          <WeekDays weekDays={weekDays} />
          <DaysOfMonth
            onDayClick={onDayClick}
            days={days}
            selectedMap={selectedMap}
            rangeStartStr={rangeStartStr}
            rangeEndStr={rangeEndStr}
            isShowCurrentMonth={isShowCurrentMonth}
          />
        </div>
      )}
    </div>
  )
}
