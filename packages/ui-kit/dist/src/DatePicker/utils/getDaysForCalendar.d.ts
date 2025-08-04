export type CalendarDay = {
    date: Date;
    isToday: boolean;
    dayOfTheWeek: number;
    isCurrentMonth: boolean;
};
type getDaysForCalendarProps = {
    offsetMonths: number;
    indexOfSelectedMonth?: number;
    selectedYear?: string;
};
export declare const getDaysForCalendar: ({ offsetMonths, indexOfSelectedMonth, selectedYear, }: getDaysForCalendarProps) => CalendarDay[];
export {};
