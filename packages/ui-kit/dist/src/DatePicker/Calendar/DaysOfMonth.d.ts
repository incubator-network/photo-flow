import { DayType } from './Calendar'
type DaysOfMonthPropsType = {
  onDayClick: (day: Date) => void
  days: DayType[]
  selectedMap: Set<string>
  rangeStartStr: string
  rangeEndStr: string
  isShowCurrentMonth: boolean
}
export declare const DaysOfMonth: ({
  onDayClick,
  days,
  selectedMap,
  rangeStartStr,
  rangeEndStr,
  isShowCurrentMonth,
}: DaysOfMonthPropsType) => import('react/jsx-runtime').JSX.Element
export {}
