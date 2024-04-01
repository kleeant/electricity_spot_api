export const getDateAsNumber = (date: Date): number => {
  const parts = date.toISOString().split('T')
  const yearMonthDay = parts[0].replaceAll('-', '')
  const [hours, minutes] = parts[1].split(':')
  const res = Number(`${yearMonthDay}${hours}${minutes}`)
  return res
}

export const firstDateIsNewer = (date: Date, compare: Date): boolean => {
  return date > compare
}
