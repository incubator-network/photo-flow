'use client'
import { Pagination } from '@/components/pagination/Pagination'
import { useEffect, useMemo, useState } from 'react'
const PageSize = 10
type PaymentData = {
  DateOfPayment: string
  EndDateSubscription: string
  Price: string
  SubscriptionType: string
  PaymentType: string
}
export const MyPayment = () => {
  const [data, setData] = useState<PaymentData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(PageSize)
  const totalPages = Math.ceil(data.length / count)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * count
    const lastPageIndex = firstPageIndex + count

    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, count, data])
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch('/data/mockPaymentData.json')
        if (!response.ok) {
          throw new Error('fetch error')
        }
        const json: PaymentData[] = await response.json()
        setData(json)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    console.log('обновление cout', count)
  }, [count])

  const onChangePagination = (newPage: number, newCount: number) => {
    if (newPage < 1) {
      setCurrentPage(1) // Set to the first page
    } else if (newPage > totalPages) {
      setCurrentPage(totalPages) // Set to the last page
    } else {
      setCurrentPage(newPage)
    }
    setCount(newCount)
  }
  return (
    <div>
      <table className={'relative top-5 w-full border-collapse'}>
        <thead className={'bg-dark-500'}>
          <tr className={'text-left font-medium'}>
            <th className='text-left font-medium'>Date of Payment</th>
            <th>End date subscription</th>
            <th>Price</th>
            <th>Subscription Type </th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item, index) => (
            <tr className='display:flexm justify-around p-[10px]' key={index}>
              <td>{item.DateOfPayment}</td>
              <td>{item.EndDateSubscription}</td>
              <td className={''}>{item.Price}</td>
              <td>{item.SubscriptionType}</td>
              <td>{item.PaymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={currentPage}
        itemsCountForPage={count}
        totalCount={data.length}
        onChange={onChangePagination}
      />
    </div>
  )
}
