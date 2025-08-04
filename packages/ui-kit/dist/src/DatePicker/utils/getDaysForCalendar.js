import { addDays, addMonths, eachDayOfInterval, endOfMonth, getDay, startOfMonth, startOfToday, subDays, } from 'date-fns';
export const getDaysForCalendar = ({ offsetMonths, indexOfSelectedMonth, selectedYear, }) => {
    let baseDate;
    if (selectedYear && indexOfSelectedMonth) {
        baseDate = new Date(Number(selectedYear), indexOfSelectedMonth);
    }
    else {
        baseDate = addMonths(new Date(), offsetMonths);
    }
    const start = startOfMonth(baseDate);
    const end = endOfMonth(baseDate);
    const dateToday = startOfToday();
    const daysArray = eachDayOfInterval({ start, end }).map(day => {
        const isToday = day.toDateString() === dateToday.toDateString();
        return {
            date: day,
            isToday: isToday,
            dayOfTheWeek: (day.getDay() + 6) % 7,
            isCurrentMonth: true,
        };
    });
    const firstDayWeekday = (getDay(start) + 6) % 7;
    if (firstDayWeekday !== 0) {
        for (let i = 1; i <= firstDayWeekday; i++) {
            const dayToAdd = subDays(start, i);
            const currentDay = {
                date: dayToAdd,
                isToday: false,
                dayOfTheWeek: (getDay(dayToAdd) + 6) % 7,
                isCurrentMonth: false,
            };
            daysArray.unshift(currentDay);
        }
    }
    const lastDayWeekday = (getDay(end) + 6) % 7;
    if (lastDayWeekday !== 6) {
        const daysToAdd = 6 - lastDayWeekday;
        for (let i = 1; i <= daysToAdd; i++) {
            const dayToAdd = addDays(end, i);
            const currentDay = {
                date: dayToAdd,
                isToday: false,
                dayOfTheWeek: (getDay(dayToAdd) + 6) % 7,
                isCurrentMonth: false,
            };
            daysArray.push(currentDay);
        }
    }
    return daysArray;
};
