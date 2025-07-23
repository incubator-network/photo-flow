'use client'

import { twMerge } from 'tailwind-merge'

type PaymentsData = {
  dateOfPay: string
  dateOfEnd: string
  price: string
  subType: string
  payType: string
}

type Props = {
  data: PaymentsData[]
}

export const Table = ({ data }: Props) => {
  // Заголовки таблицы
  const headers = [
    'Date of Payments',
    'End date of subscription',
    'Price',
    'Subscription type',
    'Payment Type',
  ]

  return (
    <div>
      <table className={'w-full'}>
        <thead className={'h-[48px] gap-[72px]'}>
          <tr className={'bg-dark-500 h-[48px] text-left'}>
            {headers.map((header, index) => (
              <th
                key={index}
                className={twMerge(
                  'text-bold-14 py-[12px]',
                  index === 1 ? 'pl-[24px]' : index === 2 ? 'pl-[0]' : 'px-[24px]'
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={'border-dark-500 text-regular-14 h-[47px] border'}>
              <td className={'px-[24px] py-[11px]'}>{row.dateOfPay}</td>
              <td className={'py-[11px] pl-[24px]'}>{row.dateOfEnd}</td>
              <td className={'py-[11px] pr-[24px]'}>{row.price}</td>
              <td className={'px-[24px] py-[11px]'}>{row.subType}</td>
              <td className={'px-[24px] py-[11px]'}>{row.payType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
