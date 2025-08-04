import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import OpenedCalendarIcon from '../icons/calendar-opened.svg'
import ClosedCalendarIcon from '../icons/calendar-closed.svg'
import { RefObject } from 'react'

type ButtonTriggerType = {
  isOpen: boolean
  disabled?: boolean
  error?: { isError: boolean; errorText?: string }
  mode: 'range' | 'single'
  onHandleClick: () => void
  rangeStart?: Date | null
  rangeEnd?: Date | null
  selectionDates?: Date[]
  openButtonRef: RefObject<HTMLButtonElement | null>
  defaultDate?: string
}

export const ButtonTrigger = ({
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
}: ButtonTriggerType) => {
  return (
    <button
      ref={openButtonRef}
      disabled={disabled}
      type='button'
      className={twMerge(
        `border-dark-300 bg-dark-700 text-light-100 hover:bg-dark-500 hover:border-dark-100 disabled:text-light-900 disabled:bg-dark-500 disabled:border-dark-300 inline-flex h-[36px] w-full items-center justify-between rounded-sm border p-[6px_12px] px-3 py-1.5 disabled:border`,
        isOpen && `bg-dark-500 border`,
        !isOpen && `focus:border-accent-700 focus:border-2 focus:outline-none`,
        error?.isError && `bg-dark-500 border-danger-500 text-danger-500`,
        mode === 'range' && !isOpen && `bg-dark-500`
      )}
      onClick={onHandleClick}
    >
      {mode === 'range' && rangeStart && rangeEnd && (
        <p>
          {format(rangeStart, 'dd/MM/yyyy')} - {format(rangeEnd, 'dd/MM/yyyy')}
        </p>
      )}
      {mode === 'single' && selectionDates?.length === 1 && (
        <p>{format(selectionDates[0], 'dd/MM/yyyy')}</p>
      )}
      {defaultDate && !selectionDates?.length && <p>{format(defaultDate, 'dd/MM/yyyy')}</p>}

      {isOpen ? (
        <OpenedCalendarIcon className={`h-6 w-6`} />
      ) : (
        <ClosedCalendarIcon
          className={twMerge(`text-light-100 h-6 w-6`, error?.isError && `text-danger-500`)}
        />
      )}
    </button>
  )
}
