import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfToday,
  getDay,
  subDays,
  addDays,
  addMonths,
} from 'date-fns'

export type CalendarDay = {
  date: Date
  isToday: boolean
  dayOfTheWeek: number
  isCurrentMonth: boolean
}

export const getDaysForCalendar = (offsetMonths: number): CalendarDay[] => {
  const date = addMonths(new Date(), offsetMonths)
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const dateToday = startOfToday()

  const daysArray = eachDayOfInterval({ start, end }).map(day => {
    const isToday = format(dateToday, 'd') === String(day.getDate())

    const currentDay = {
      date: day,
      isToday: isToday,
      dayOfTheWeek: (day.getDay() + 6) % 7,
      isCurrentMonth: true,
    }

    return currentDay
  })

  const firstDayWeekday = (getDay(start) + 6) % 7
  if (firstDayWeekday !== 0) {
    for (let i = 1; i <= firstDayWeekday; i++) {
      const dayToAdd = subDays(start, i)

      const currentDay = {
        date: dayToAdd,
        isToday: false,
        dayOfTheWeek: (getDay(dayToAdd) + 6) % 7,
        isCurrentMonth: false,
      }
      daysArray.unshift(currentDay)
    }
  }

  const lastDayWeekday = (getDay(end) + 6) % 7
  if (lastDayWeekday !== 6) {
    const daysToAdd = 6 - lastDayWeekday
    for (let i = 1; i <= daysToAdd; i++) {
      const dayToAdd = addDays(end, i)

      const currentDay = {
        date: dayToAdd,
        isToday: false,
        dayOfTheWeek: (getDay(dayToAdd) + 6) % 7,
        isCurrentMonth: false,
      }
      daysArray.push(currentDay)
    }
  }

  return daysArray
}
