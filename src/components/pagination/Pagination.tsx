'use client'
import React, { ChangeEvent } from 'react'
// import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import { Pagination } from '@mui/material'
import { twMerge } from 'tailwind-merge'
// import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'hw15',
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage)

  const onChangeCallback = (_: ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    // пишет студент
    onChange(page, Number(event.currentTarget.value))
  }

  return (
    <div className={twMerge('flex, items-center')}>
      <Pagination
        shape='rounded'
        variant='outlined'
        color='primary'
        id={id + '-pagination'}
        sx={
          {
            // стили для Pagination // пишет студент
          }
        }
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />

      <span className={twMerge('capitalize pl-[30px] pr-[10px]')}>
        показать
      </span>

      <select
        id={'select'}
        value={itemsCountForPage}
        onChange={onChangeSelect}
      />
      {/*<SuperSelect*/}
      {/*  id={id + '-pagination-select'}*/}
      {/*  value={itemsCountForPage}*/}
      {/*  options={[*/}
      {/*    { id: 4, value: 4 },*/}
      {/*    { id: 7, value: 7 },*/}
      {/*    { id: 10, value: 10 },*/}
      {/*  ]}*/}
      {/*  onChange={e => onChangeSelect(e)}*/}
      {/*/>*/}

      <span className={twMerge('p-x-[10px]')}>строк в таблице</span>
    </div>
  )
}

export default SuperPagination
