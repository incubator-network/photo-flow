import { RefObject } from 'react'
type ButtonTriggerType = {
  isOpen: boolean
  disabled?: boolean
  error?: {
    isError: boolean
    errorText?: string
  }
  mode: 'range' | 'single'
  onHandleClick: () => void
  rangeStart?: Date | null
  rangeEnd?: Date | null
  selectionDates?: Date[]
  openButtonRef: RefObject<HTMLButtonElement | null>
  defaultDate?: string
}
export declare const ButtonTrigger: ({
  isOpen,
  disabled,
  mode,
  error,
  onHandleClick,
  rangeStart,
  rangeEnd,
  selectionDates,
  openButtonRef,
  defaultDate,
}: ButtonTriggerType) => import('react/jsx-runtime').JSX.Element
export {}
