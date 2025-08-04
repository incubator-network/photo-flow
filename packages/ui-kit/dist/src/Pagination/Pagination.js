'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../Typography'
import { Select } from '../Select'
import ChevronRightIcon from '../icons/pagination-right.svg'
import ChevronLeftIcon from '../icons/pagination-left.svg'
import { usePagination } from './hooks/usePagination'
export const Pagination = ({
  currentPage,
  itemsPerPage,
  totalCount,
  onChangePagination,
  // id = 'pagination',
}) => {
  const [selectValue, setSelectValue] = useState('10')
  const paginationRange = usePagination({
    currentPage,
    pageSize: itemsPerPage,
    totalCount,
  })
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }
  const lastPage = Number(paginationRange?.[paginationRange.length - 1])
  const onChangeCallback = e => {
    const pageNumber = Number(e.currentTarget.textContent)
    onChangePagination(pageNumber, itemsPerPage)
  }
  const onChangeSelect = value => {
    console.log(value)
    setSelectValue(value)
    onChangePagination(currentPage, Number(value))
  }
  const onPreviousPage = () => {
    onChangePagination(currentPage - 1, itemsPerPage)
  }
  const onNextPage = () => {
    onChangePagination(currentPage + 1, itemsPerPage)
  }
  return _jsxs('div', {
    className: twMerge('mt-[30px] inline-flex items-center'),
    children: [
      _jsx(ChevronLeftIcon, {
        className: twMerge('mx-[15px] disabled:opacity-50', currentPage <= 1 && 'opacity-50'),
        onClick: onPreviousPage,
      }),
      _jsx('ul', {
        className: 'flex max-w-xs list-none items-center justify-center gap-x-3 select-none',
        children: paginationRange?.map((pageNumber, index) => {
          if (pageNumber.toString() === '...') {
            return _jsx('li', { children: '\u2026' }, `${pageNumber}+${index}`)
          }
          return _jsx(
            'li',
            {
              onClick: e => onChangeCallback(e),
              className: `text-regular-14 flex max-h-[24px] max-w-[24px] items-center justify-center rounded-md border border-transparent bg-transparent p-4 text-white hover:cursor-pointer hover:border-blue-500 ${currentPage === pageNumber ? 'border-white bg-white !text-black' : ''}`,
              children: pageNumber,
            },
            pageNumber
          )
        }),
      }),
      _jsx(ChevronRightIcon, {
        className: twMerge('mx-[15px]', currentPage >= lastPage && 'opacity-50'),
        onClick: onNextPage,
      }),
      _jsx(Typography, {
        variant: 'regular_text_14',
        className: twMerge('pr-[15px] pl-[30px] capitalize'),
        children: 'Show',
      }),
      _jsx(Select, {
        value: selectValue,
        items: [
          { title: '10' },
          { title: '20' },
          { title: '30' },
          { title: '50' },
          { title: '100' },
        ],
        className: '',
        onValueChange: value => onChangeSelect(value),
      }),
      _jsx(Typography, {
        variant: 'regular_text_14',
        className: twMerge('px-[15px]'),
        children: 'on page',
      }),
    ],
  })
}
