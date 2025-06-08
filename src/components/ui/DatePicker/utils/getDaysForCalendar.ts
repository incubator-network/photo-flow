import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfToday,
  getDay,
  subDays,
  addDays,
} from 'date-fns'

export const getDaysForCalendar = () => {
  const date = new Date()
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
    for (let i = 1; i <= firstDayWeekday; i++) {
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
