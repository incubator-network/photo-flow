'use client'
import React, { ChangeEvent } from 'react'
import { Pagination as PaginationMui } from '@mui/material'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/components/ui/typography/Typography'
import { Select } from '@/components/ui/Select/Select'
import ChevronRightIcon from '@/assets/icons/chevron-right-icon.svg'
import ChevronLeftIcon from '@/assets/icons/chevron-left-icon.svg'

export type PaginationPropsType = {
  id?: string
  page: number
  itemsPerPage: number
  totalCount: number
  onChangePagination: (page: number, count: number) => void
}

export const Pagination = ({
  page,
  itemsPerPage,
  totalCount,
  onChangePagination,
  id = 'pagination',
}: PaginationPropsType) => {
  const lastPage = Math.ceil(totalCount / itemsPerPage)

  const onChangeCallback = (_: ChangeEvent<unknown>, page: number) => {
    onChangePagination(page, itemsPerPage)
  }

  const onChangeSelect = (value: string) => {
    console.log(value)
    onChangePagination(page, Number(value))
  }
  const onPreviousPage = () => {
    onChangePagination(page - 1, itemsPerPage)
  }
  const onNextPage = () => {
    onChangePagination(page + 1, itemsPerPage)
  }

  return (
    <div className={twMerge('mt-[30px] inline-flex items-center')}>
      <ChevronLeftIcon
        className={twMerge(
          'mx-[15px] disabled:opacity-50',
          page <= 1 && 'opacity-50'
        )}
        onClick={onPreviousPage}
      />

      <PaginationMui
        shape='rounded'
        variant='outlined'
        color='primary'
        id={id + '-pagination'}
        className={''}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
            border: '1px solid transparent',
            backgroundColor: 'transparent',
            '&:hover': {
              borderColor: 'blue',
            },
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'white',
            borderColor: 'white',
            color: 'black',
          },
        }}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />
      <ChevronRightIcon
        className={twMerge('mx-[15px]', page >= lastPage && 'opacity-50')}
        onClick={onNextPage}
      />
      <Typography
        variant={'regular_text_14'}
        className={twMerge('pr-[15px] pl-[30px] capitalize')}
      >
        Show
      </Typography>
      <Select
        items={[
          { title: '10' },
          { title: '20' },
          { title: '30' },
          { title: '50' },
          { title: '100' },
        ]}
        contentClassName={'w-[52px]   '}
        onChangeOption={value => onChangeSelect(value)}
      />
      <Typography variant={'regular_text_14'} className={twMerge('px-[15px]')}>
        on page
      </Typography>
    </div>
  )
}
