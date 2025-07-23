'use client'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { Table } from '@/lib/feature/profile/ui/components/profile/MyPayments/Table/Table'
import { useGetMyPaymentsQuery } from '@/lib/feature/profile/api/profileApi'

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
  const { data } = useGetMyPaymentsQuery()
  console.log(data)
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
