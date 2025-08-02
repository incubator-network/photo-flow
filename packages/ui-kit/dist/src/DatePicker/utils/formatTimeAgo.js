export function formatTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes === 1) return `${minutes} minute ago`
  if (minutes < 60) return `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours === 1) return `${hours} hour ago`
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return `${days} day ago`
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1) return `${months} month ago`
  if (months < 12) return `${months} months ago`
  const years = Math.floor(months / 12)
  if (years === 1) return `${years} year ago`
  return `${years} years ago`
}
