type UseCalendarSelectionReturn = {
  selectionDates: Date[]
  onDayClick: (day: Date) => void
  mode: 'single' | 'range'
  rangeStart: Date | null
  rangeEnd: Date | null
  today: Date
}
export declare const useCalendarSelection: (
  isOnlySingleMode?: true | undefined
) => UseCalendarSelectionReturn
export {}
