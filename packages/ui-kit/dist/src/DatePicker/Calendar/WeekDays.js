import { jsx as _jsx } from 'react/jsx-runtime'
export const WeekDays = ({ weekDays }) => {
  return _jsx('ul', {
    className: `text-dark-100 flex items-center justify-center`,
    children: weekDays.map((wd, i) => {
      return _jsx(
        'li',
        { className: `flex h-[40px] w-[36px] items-center justify-center`, children: wd },
        i
      )
    }),
  })
}
