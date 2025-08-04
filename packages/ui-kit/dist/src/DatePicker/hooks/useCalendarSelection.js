'use client'
import { compareAsc, isSameDay, startOfToday } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { getDatesBetween } from '../utils/getDatesBetween'
export const useCalendarSelection = isOnlySingleMode => {
  const [selectionDates, setSelectionDates] = useState([])
  const [mode, setMode] = useState('single')
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd, setRangeEnd] = useState(null)
  const today = startOfToday()
  useEffect(() => {
    if (isOnlySingleMode) {
      setMode('single')
    }
  }, [isOnlySingleMode])
  const onDayClick = day => {
    if (isOnlySingleMode) {
      setSelectionDates([day])
      setRangeStart(day)
      setRangeEnd(day)
      return
    }
    const isSelectedDate = selectionDates.some(d => isSameDay(d, day))
    let updatedDates
    if (isSelectedDate) {
      updatedDates = selectionDates.filter(d => !isSameDay(d, day))
    } else {
      updatedDates = [...selectionDates, day]
    }
    if (updatedDates.length > 2) {
      setMode('single')
      setSelectionDates([day])
      setRangeStart(null)
      setRangeEnd(null)
      return
    }
    if (updatedDates.length === 2) {
      const [start, end] = updatedDates.sort(compareAsc)
      const fullRange = getDatesBetween(start, end)
      setSelectionDates(fullRange)
      setRangeStart(start)
      setRangeEnd(end)
      setMode('range')
      return
    }
    setSelectionDates(updatedDates)
    setRangeStart(null)
    setRangeEnd(null)
    setMode('single')
  }
  const sorterSelectionDates = useMemo(() => [...selectionDates].sort(compareAsc), [selectionDates])
  return {
    selectionDates: sorterSelectionDates,
    onDayClick,
    mode,
    rangeStart,
    rangeEnd,
    today,
  }
}
