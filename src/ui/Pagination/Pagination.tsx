'use client'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from 'photo-flow-ui-kit'
import { Select } from 'photo-flow-ui-kit'
import ChevronRightIcon from '@/assets/icons/pagination-right.svg'
import ChevronLeftIcon from '@/assets/icons/pagination-left.svg'
import { usePagination } from '@/hooks/usePagintaion'

export type PaginationPropsType = {
  id?: string
  currentPage: number
  itemsPerPage: number
  totalCount: number
  onChangePagination: (page: number, count: number) => void
}

export const Pagination = ({
  currentPage,
  itemsPerPage,
  totalCount,
  onChangePagination,
  // id = 'pagination',
}: PaginationPropsType) => {
  const [selectValue, setSelectValue] = useState('10')
  const paginationRange = usePagination({
    currentPage,
    pageSize: itemsPerPage,
    totalCount,
  })
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null
  }
  const lastPage: number = Number(paginationRange?.[paginationRange.length - 1])

  const onChangeCallback = (e: React.MouseEvent<HTMLLIElement>) => {
    const pageNumber = Number(e.currentTarget.textContent)
    onChangePagination(pageNumber, itemsPerPage)
  }

  const onChangeSelect = (value: string) => {
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

  return (
    <div className={twMerge('mt-[30px] inline-flex items-center')}>
      <ChevronLeftIcon
        className={twMerge('mx-[15px] disabled:opacity-50', currentPage <= 1 && 'opacity-50')}
        onClick={onPreviousPage}
      />
      <ul className={'flex max-w-xs list-none items-center justify-center gap-x-3 select-none'}>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber.toString() === '...') {
            return <li key={`${pageNumber}+${index}`}>&#8230;</li>
          }
          return (
            <li
              key={pageNumber}
              onClick={e => onChangeCallback(e)}
              className={`text-regular-14 flex max-h-[24px] max-w-[24px] items-center justify-center rounded-md border border-transparent bg-transparent p-4 text-white hover:cursor-pointer hover:border-blue-500 ${
                currentPage === pageNumber ? 'border-white bg-white !text-black' : ''
              }`}
            >
              {pageNumber}
            </li>
          )
        })}
      </ul>

      <ChevronRightIcon
        className={twMerge('mx-[15px]', currentPage >= lastPage && 'opacity-50')}
        onClick={onNextPage}
      />
      <Typography variant={'regular_text_14'} className={twMerge('pr-[15px] pl-[30px] capitalize')}>
        Show
      </Typography>
      <Select
        value={selectValue}
        items={[
          { title: '10' },
          { title: '20' },
          { title: '30' },
          { title: '50' },
          { title: '100' },
        ]}
        className={''}
        onValueChange={value => onChangeSelect(value)}
      />
      <Typography variant={'regular_text_14'} className={twMerge('px-[15px]')}>
        on page
      </Typography>
    </div>
  )
}
