export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  })
}
export const formatDateToDotFormat = isoDate => {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы с 0
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}
