'use client'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { Table } from '@/lib/feature/profile/ui/components/profile/MyPayments/Table/Table'

const tableData = [
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$103',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
  {
    dateOfPay: '12.12.2022',
    dateOfEnd: '12.01.2023',
    price: '$10',
    subType: '1 month',
    payType: 'PayPal',
  },
]

export const MyPayments = () => {
  return (
    <div className={'w-full'}>
      <Table data={tableData} />
      <Pagination
        currentPage={1}
        itemsPerPage={20}
        totalCount={200}
        onChangePagination={() => {}}
      />
    </div>
  )
}
