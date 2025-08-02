import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import OpenedCalendarIcon from '@/assets/icons/calendar-opened.svg'
import ClosedCalendarIcon from '@/assets/icons/calendar-closed.svg'
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
}) => {
  return _jsxs('button', {
    ref: openButtonRef,
    disabled: disabled,
    type: 'button',
    className: twMerge(
      `border-dark-300 bg-dark-700 text-light-100 hover:bg-dark-500 hover:border-dark-100 disabled:text-light-900 disabled:bg-dark-500 disabled:border-dark-300 inline-flex h-[36px] w-full items-center justify-between rounded-sm border p-[6px_12px] px-3 py-1.5 disabled:border`,
      isOpen && `bg-dark-500 border`,
      !isOpen && `focus:border-accent-700 focus:border-2 focus:outline-none`,
      error?.isError && `bg-dark-500 border-danger-500 text-danger-500`,
      mode === 'range' && !isOpen && `bg-dark-500`
    ),
    onClick: onHandleClick,
    children: [
      mode === 'range' &&
        rangeStart &&
        rangeEnd &&
        _jsxs('p', {
          children: [format(rangeStart, 'dd/MM/yyyy'), ' - ', format(rangeEnd, 'dd/MM/yyyy')],
        }),
      mode === 'single' &&
        selectionDates?.length === 1 &&
        _jsx('p', { children: format(selectionDates[0], 'dd/MM/yyyy') }),
      defaultDate &&
        !selectionDates?.length &&
        _jsx('p', { children: format(defaultDate, 'dd/MM/yyyy') }),
      isOpen
        ? _jsx(OpenedCalendarIcon, { className: `h-6 w-6` })
        : _jsx(ClosedCalendarIcon, {
            className: twMerge(`text-light-100 h-6 w-6`, error?.isError && `text-danger-500`),
          }),
    ],
  })
}
