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
export declare const Calendar: ({
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
}: CalendarProps) => import('react/jsx-runtime').JSX.Element
export {}
