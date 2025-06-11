'use client'
import { Pagination } from '@/components/pagination/Pagination'
import { useEffect, useMemo, useState } from 'react'
import {
  // useRouter,
  useSearchParams,
} from 'next/navigation'

type PaymentData = {
  DateOfPayment: string
  EndDateSubscription: string
  Price: string
  SubscriptionType: string
  PaymentType: string
}
export const MyPayment = () => {
  const [data, setData] = useState<PaymentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  // const router = useRouter()

  const itemsPerPage = Math.min(
    Math.max(parseInt(searchParams.get('itemsPerPage') || '10', 10), 10),
    100
  )
  const currentPage = Math.max(parseInt(searchParams.get('page') || '1', 10), 1)

  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage)
  const [currentPageState, setCurrentPageState] = useState(currentPage)

  const totalPages = Math.ceil(data.length / itemsPerPageState)

  const currentTableData = useMemo(() => {
    const firstItemIndex = (currentPageState - 1) * itemsPerPageState
    const lastItemIndex = firstItemIndex + itemsPerPageState
    return data.slice(firstItemIndex, lastItemIndex)
  }, [currentPageState, itemsPerPageState, data])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/mockPaymentData.json')
        if (!response.ok)
          throw new Error(
            `Failed to fetch data ${response.status}: ${response.statusText}`
          )
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePaginationChange = (page: number, perPage: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    const validPerPage = Math.max(10, Math.min(perPage, 100))

    setCurrentPageState(validPage)
    setItemsPerPageState(validPerPage)

    // Если нужно обновить URL:
    // const params = new URLSearchParams()
    // params.set('page', validPage.toString())
    // params.set('itemsPerPage', validPerPage.toString())
    // router.replace(`/payments?${params.toString()}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <table className='mt-5 w-full border-collapse'>
        <thead className={'bg-dark-500'}>
          <tr className={'text-left font-medium'}>
            <th className='text-left font-medium'>Date of Payment</th>
            <th>End date subscription</th>
            <th>Price</th>
            <th>Subscription Type</th>
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
        currentPage={currentPageState}
        itemsPerPage={itemsPerPageState}
        totalCount={data.length}
        onChangePagination={handlePaginationChange}
      />
    </div>
  )
}
