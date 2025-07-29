'use client'

import { Table } from '@/lib/feature/profile/ui/components/profile/MyPayments/Table/Table'
import Loader from '@/components/ui/loader/Loader'
import { useGetMyPaymentsQuery } from '@/lib/feature/subscriptions/api/subscriptionApi'

export const MyPayments = () => {
  const { data, isLoading } = useGetMyPaymentsQuery()
  if (isLoading || !data) {
    return <Loader />
  }
  return (
    <div className={'w-full'}>
      <Table data={data} />
    </div>
  )
}
