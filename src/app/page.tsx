'use client'
import Pagination from '@/components/pagination/Pagination'

export default function Home() {
  return (
    <div style={{ height: '2000px', width: '120%' }}>
      <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
        Hello this a test string
      </div>
      <Pagination
        page={2}
        itemsCountForPage={3}
        totalCount={10}
        onChange={() => {}}
      />
    </div>
  )
}
