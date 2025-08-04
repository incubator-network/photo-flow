import { ReactElement } from 'react'
type DatePickerProps = {
  className?: string
  disabled?: boolean
  error?: {
    isError: boolean
    errorText?: string
  }
  onDatesChange?: (dates: Date[]) => void
  title?: string | ReactElement
  isOnlySingleMode?: true
  value?: Date | Date[] | null
  onValueChange?: (date: Date | Date[] | null) => void
  defaultDate?: string
}
export declare const normalizeDateToMidnightUTC: (date: Date) => string
export declare const months: string[]
export declare const DatePicker: ({
  className,
  disabled,
  error,
  onDatesChange,
  title,
  isOnlySingleMode,
  onValueChange,
  defaultDate,
}: DatePickerProps) => import('react/jsx-runtime').JSX.Element
export {}
