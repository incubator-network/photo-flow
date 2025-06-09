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
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const Pagination = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'pagination',
}: PaginationPropsType) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage)

  const onChangeCallback = (_: ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (value: string) => {
    console.log(value)
    onChange(page, Number(value))
  }
  const onPreviousPage = () => {
    onChange(page - 1, itemsCountForPage)
  }
  const onNextPage = () => {
    onChange(page + 1, itemsCountForPage)
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
